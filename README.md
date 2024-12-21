# ActiveSG Badminton Venue Availability Scraper

This project consists of a Python-based scraper and a Flask API that automates the process of checking and saving available timeslots for venues listed on the ActiveSG website. The scraper utilizes Selenium for browser automation and BeautifulSoup for HTML parsing, and outputs the results in a CSV file for easy viewing. The Flask API provides endpoints to interact with the scraped data stored in a MongoDB database.

## Features

- **Scraper**: Automates the process of checking available timeslots for badminton venues on the ActiveSG website.
- **API**: Provides endpoints to upload CSV files, scrape data, and query available timeslots.
- **Database**: Uses MongoDB to store and query venue availability data.
- **Frontend**: React-based frontend to interact with the API and display available timeslots.

## Setup

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Python](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

### Getting Started

#### Cloning the Repository:

```sh
git clone git@github.com:gabrielojh/activesg-bot.git
cd activesg-bot
```

#### Scraper Standalone
The python scraper can be run on its own without starting the backend, database and frontend

```sh
# Ensure that you are in the root directory and have python installed

# Create a virtual environment
python -m venv venv

# Activate the virtual environment (Mac Command)
source venv/bin/activate

# Download the necessary modules
pip install -r requirements.txt

# Run the scraper
python scraper.py
```

#### Fullstack
Running the fullstack application is simply, just use the provided docker compose file
```sh
# Ensure that you are in the root directory
docker-compose up --build
```
The API will be available at `http://localhost:8080/`

The Website will be available at `http://localhost:5173/`
