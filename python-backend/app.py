from flask import Flask, jsonify
from flask_cors import CORS
from scraper import scraper, data
from mongo_loader import run_mongo_loader

app = Flask(__name__)
CORS(app)

@app.route('/scrape', methods=['GET'])
def scrape_endpoint():
    print("Scraping data...")
    scraper()
    run_mongo_loader()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)