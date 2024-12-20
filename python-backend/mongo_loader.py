from pymongo import MongoClient
import json
import os
import csv
from datetime import datetime
import pymongo


def run_mongo_loader():

    client = MongoClient("mongodb://localhost:27017/")
    db = client["badminton"]
    collection = db["venues"]

    # Create PK index using Venue + Date + Timeslot
    collection.create_index(
        [
            ("Venue", pymongo.ASCENDING),
            ("DateTime", pymongo.ASCENDING),
        ],
        unique=True,
    )

    # Read the CSV file
    with open('../output/activesg_badminton.csv', 'r') as file:
        reader = csv.DictReader(file)
        records = []
        for row in reader:
            # Parse the date and time
            date_str = row['Date'].strip('"')
            time_str = row['Timeslot'].strip()
            date_time_str = f"{date_str} {time_str}"
            print(date_time_str)
            date_time_obj = datetime.strptime(date_time_str, "%a, %d %b %I:%M %p")
            date_time_obj = date_time_obj.replace(year=datetime.now().year)
            print(date_time_obj)

            # Create a record
            record = {
                "Venue": row['Venue'],
                "DateTime": date_time_obj
            }
            records.append(record)
    
    # Insert records into MongoDB
    try:
        result = collection.insert_many(records, ordered=False)
        print(f"Number of records inserted: {len(result.inserted_ids)}")
    except pymongo.errors.BulkWriteError as e:
        print(f"Error inserting records: {e.details}")

    # Close the MongoDB connection
    client.close()

# run_mongo_loader()
