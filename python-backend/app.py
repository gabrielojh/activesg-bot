from datetime import datetime, timedelta
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from scraper import scraper, data
from flask_pymongo import PyMongo
import pymongo.errors
import logging
from utils import parse_csv
from bson.json_util import dumps
import json

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

app = Flask(__name__)
CORS(app)

# MongoDB connection
app.config["MONGO_URI"] = "mongodb://mongodb:27017/badminton"
mongo = PyMongo(app)

# MongoDB Config
db = mongo.db
db.venues.create_index([("Venue", 1), ("DateTime", 1)])


@app.route("/", methods=["GET"])
def health_check():
    print("Health check")
    return jsonify({"status": "healthy"}), 200


@app.route("/scrape", methods=["GET"])
def scrape_endpoint():
    print("Scraping data...")
    scraper()
    results = parse_csv("./output/activesg_badminton.csv")
    db.venues.insert_many(results, ordered=False)
    return jsonify(data), 200


@app.route("/files/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        print("No file part")
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        print("No selected file")
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith(".csv"):
        file_path = os.path.join("./output", file.filename)
        file.save(file_path)
        print("Inserting data to MongoDB...")
        records = parse_csv(file_path)
        try:
            db.venues.insert_many(records, ordered=False)
            print("Data inserted successfully")
            return jsonify({"status": "ok"}), 200
        except pymongo.errors.DuplicateKeyError as e:
            print(f"Duplicate key error: {e}")
            return jsonify({"error": "Duplicate key error"}), 200
        except Exception as e:
            print(f"Error inserting data: {e}")
            return jsonify({"error": "Error inserting data"}), 500

    return jsonify({"error": "Invalid file type"}), 400


@app.route("/venues", methods=["POST"])
def get_venues():
    try:
        # Get Params
        req_data = request.get_json() or {}
        venue_list = req_data.get("venue")
        date_str = req_data.get("date")

        # Build Query
        query = {}
        if venue_list:
            query["Venue"] = {"$in": venue_list}
        if date_str:
            # Parse the date string and create a range
            query_date = datetime.fromisoformat(date_str)
            start_of_day = query_date.replace(hour=0, minute=0, second=0, microsecond=0)
            end_of_day = start_of_day + timedelta(days=1)
            
            query["DateTime"] = {
                "$gte": start_of_day,
                "$lt": end_of_day
            }

        logging.info(f"Query: {query}")
        venues = db.venues.find(query, {"_id": 0})

        # Format datetime in response
        response = []
        for venue in venues:
            venue["DateTime"] = venue["DateTime"].isoformat()
            response.append(venue)

        return jsonify(response), 200
    except Exception as e:
        logging.error(f"Error: {e}")
        return jsonify({"error": "Error fetching data"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=8080)
