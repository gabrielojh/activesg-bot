from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
import time
import csv

data = []

def main():
    # Open ActiveSG booking website
    url = "https://activesg.gov.sg/activities/list"

    # Setup Chrome WebDriver with options
    options = webdriver.ChromeOptions()
    # options.add_argument("--headless")  # Run Chrome in headless mode
    # options.add_argument("--disable-gpu")  # Disable GPU acceleration
    # options.add_argument("--window-size=1920,1080")  # Set window size to avoid issues with elements not being in view

    service = ChromeService(executable_path=ChromeDriverManager().install())
    browser = webdriver.Chrome(service=service, options=options)

    browser.get(url)

    # Wait until the "Ok" button is clickable
    ok_button = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Ok')]"))
    )

    if ok_button:
        time.sleep(1)

        # Scroll the button into view
        browser.execute_script("arguments[0].scrollIntoView(true);", ok_button)

        # Use JavaScript to click the button
        browser.execute_script("arguments[0].click();", ok_button)

    browser.find_element(By.XPATH, "//p[contains(text(), 'Badminton')]").click()

    time.sleep(2)
    # Wait until page finishes loading
    WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "div.chakra-stack a"))
    )

    # Badminton Venues Page
    links = [
        link
        for link in browser.find_elements(By.CSS_SELECTOR, "div.chakra-stack a")
        if "venues" in link.get_attribute("href")
    ]

    for link in links:
        # print(link.get_attribute("href"))
        venue_name = link.find_element(By.CSS_SELECTOR, "p").text
        print(f"Checking availability for {venue_name}...", end="")
        timeslot_data = process_link(browser, link.get_attribute("href"))

        # Append data to the main list
        if timeslot_data:
            for date, times in timeslot_data.items():
                for time_slot in times:
                    data.append([venue_name, date, time_slot])

    # Save data to CSV
    save_to_csv("activesg_badminton.csv", data)

    # Quit after input
    input("Press Enter to quit...")
    browser.quit()


def process_link(browser, link_url):
    # Open the link in a new tab
    browser.execute_script("window.open(arguments[0]);", link_url)
    browser.switch_to.window(browser.window_handles[-1])

    try:
        # Wait until the page finishes loading
        WebDriverWait(browser, 10).until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, "p.chakra-text.css-12346zh")
            )
        )

        # Availability of court
        is_available = True

        # Get the page source and parse it with BeautifulSoup
        html = browser.page_source
        soup = BeautifulSoup(html, "html.parser")

        # Check if the page contains the text "no more available"
        if "no more available" in soup.text:
            is_available = False

        print(" (Not Available)" if not is_available else " (Available)")

        if is_available:
            return parse_dates(browser)

    except Exception as e:
        print(f"Error processing link {link_url}: {e}")
    finally:
        # Close the tab
        browser.close()
        # Switch back to the original tab
        browser.switch_to.window(browser.window_handles[0])


def parse_dates(browser):
    timeslot_data = {}
    # Find all date buttons based on the "aria-label" attribute
    date_buttons = browser.find_elements(
        By.CSS_SELECTOR, "button.chakra-card[aria-label]"
    )

    # Iterate through all the date buttons
    for button in date_buttons:
        # Get the date from the aria-label
        date = button.get_attribute("aria-label").split("for ")[-1]  # Extract the date portion

        # Scroll into view and click the button
        browser.execute_script("arguments[0].scrollIntoView(true);", button)
        ActionChains(browser).move_to_element(button).click().perform()
        WebDriverWait(browser, 10).until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, "p.chakra-text.css-1xypwj1")
            )
        )

        # Find all available timeslots after clicking the button
        timeslots = browser.find_elements(
            By.CSS_SELECTOR, "p.chakra-text.css-1xypwj1"
        )  # Adjust this selector as needed

        # Extract and save the timeslot text
        times = [slot.text for slot in timeslots if slot.text.strip()]
        timeslot_data[date] = times

        print(f"Date: {date}, Timeslots: {times}")

    return timeslot_data


def save_to_csv(file_name, data):
    with open(file_name, "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["Venue", "Date", "Timeslot"])
        writer.writerows(data)
    print(f"Data saved to {file_name}")

main()
