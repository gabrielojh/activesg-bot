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
db.venues.create_index([("Venue", 1), ("DateTime", 1)], unique=True)


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
        logging.error("No file part")
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        logging.error("No selected file")
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith(".csv"):
        file_path = os.path.join("./output", file.filename)
        file.save(file_path)
        logging.info("Inserting data to MongoDB...")
        records = parse_csv(file_path)
        try:
            db.venues.insert_many(records, ordered=False)
            logging.info("Data inserted successfully")
            return jsonify({"status": "ok"}), 200
        except pymongo.errors.DuplicateKeyError as e:
            logging.error(f"Duplicate key error: {e}")
            return jsonify({"error": "Duplicate key error"}), 200
        except Exception as e:
            logging.error(f"Error inserting data: {e}")
            return jsonify({"error": "Error inserting data"}), 500

    return jsonify({"error": "Invalid file type"}), 400


@app.route("/venues", methods=["POST"])
def get_venues():
    try:
        # Get Params
        req_data = request.get_json() or {}
        venue_list = req_data.get("venue")
        date_str = req_data.get("date")
        start_time_str = req_data.get("startTime")
        end_time_str = req_data.get("endTime")

        # Build Query
        query = {}
        if venue_list:
            query["Venue"] = {"$in": venue_list}

        # Handle date and time logic
        if date_str:
            # Case: Date present
            query_date = datetime.fromisoformat(date_str)
            start_time = query_date.replace(hour=0, minute=0, second=0, microsecond=0)
            end_time = start_time + timedelta(days=1)

            if start_time_str or end_time_str:
                # If time range is present along with the date
                start_time = (
                    datetime.fromisoformat(f"{date_str}T{start_time_str}")
                    if start_time_str
                    else start_time
                )
                end_time = (
                    datetime.fromisoformat(f"{date_str}T{end_time_str}")
                    if end_time_str
                    else end_time
                )
            query["DateTime"] = {"$gte": start_time, "$lt": end_time}

        elif start_time_str or end_time_str:
            # Case: Time range without date
            start_time_seconds = (
                int(start_time_str.split(":")[0]) * 3600
                + int(start_time_str.split(":")[1]) * 60
                + int(start_time_str.split(":")[2])
                if start_time_str
                else 0  # Default to start of day
            )
            end_time_seconds = (
                int(end_time_str.split(":")[0]) * 3600
                + int(end_time_str.split(":")[1]) * 60
                + int(end_time_str.split(":")[2])
                if end_time_str
                else 86400  # Default to end of day (24 * 3600 seconds)
            )

            query["$expr"] = {
                "$and": [
                    {
                        "$gte": [
                            {
                                "$add": [
                                    {"$multiply": [{"$hour": "$DateTime"}, 3600]},
                                    {"$multiply": [{"$minute": "$DateTime"}, 60]},
                                    {"$second": "$DateTime"},
                                ]
                            },
                            start_time_seconds,
                        ]
                    },
                    {
                        "$lt": [
                            {
                                "$add": [
                                    {"$multiply": [{"$hour": "$DateTime"}, 3600]},
                                    {"$multiply": [{"$minute": "$DateTime"}, 60]},
                                    {"$second": "$DateTime"},
                                ]
                            },
                            end_time_seconds,
                        ]
                    },
                ]
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
