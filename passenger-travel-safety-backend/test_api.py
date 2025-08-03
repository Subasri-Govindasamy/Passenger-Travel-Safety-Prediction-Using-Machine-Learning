import requests  # Import requests module

# API endpoint (Your Flask server's /predict route)
url = "http://127.0.0.1:5000/predict"

# JSON data to send in the request
data = {
    "age": 30,
    "weather": "rainy",
    "health_conditions": {
        "heart_disease": "No",
        "mobility_issues": "Yes"
    },
    "mode_of_travel": "Train",
    "source": "Chennai",
    "destination": "Hyderabad"
}

# Send a POST request to the API with JSON data
response = requests.post(url, json=data)

# Print the response from the server
print("Response Status Code:", response.status_code)  # Should be 200 if successful
print("Response JSON:", response.json())  # Print the JSON response
