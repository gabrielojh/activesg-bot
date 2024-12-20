import csv
from datetime import datetime


def parse_csv(file_path):
    with open(file_path, "r") as file:
        reader = csv.DictReader(file)
        records = []
        for row in reader:
            date_str = row["Date"].strip('"')
            time_str = row["Timeslot"].strip()
            date_time_str = f"{date_str} {time_str}"
            date_time_obj = datetime.strptime(date_time_str, "%a, %d %b %I:%M %p")
            date_time_obj = date_time_obj.replace(year=datetime.now().year)

            records.append({"Venue": row["Venue"], "DateTime": date_time_obj})
    return records
