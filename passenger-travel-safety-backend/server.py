'''from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# Load the datasets
safety_data = pd.read_csv("passenger_travel_safety_data.csv")
accident_data = pd.read_csv("accident_data.csv")

@app.route('/')
def home():
    return "Backend is running!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    source = data.get("source")
    destination = data.get("destination")
    mode_of_travel = data.get("mode_of_travel")

    # Check if the given route exists in accident history
    route_data = accident_data[
        (accident_data["Source"] == source) & 
        (accident_data["Destination"] == destination) & 
        (accident_data["Mode of Travel"] == mode_of_travel)
    ]

    if route_data.empty:
        return jsonify({"message": "No accident history found for this route.", "prediction": "Safe"})

    # Get accident details
    num_accidents = route_data["Number of Accidents"].values[0]
    severity = route_data["Severity"].values[0]
    weather_condition = route_data["Weather"].values[0]

    # Determine travel safety
    if num_accidents >= 5 or severity == "Severe":
        travel_safety = "Not Safe"
    else:
        travel_safety = "Safe"

    return jsonify({
        "source": source,
        "destination": destination,
        "mode_of_travel": mode_of_travel,
        "num_accidents": int(num_accidents),
        "severity": severity,
        "weather_condition": weather_condition,
        "prediction": travel_safety
    })

if __name__ == '__main__':
    app.run(debug=True)'''
