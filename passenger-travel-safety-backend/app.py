'''import pandas as pd
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load passenger travel safety dataset
travel_data = pd.read_csv("passenger_travel_safety_data.csv")
print("Passenger Travel Safety Dataset Loaded Successfully!\n")
print(travel_data.head())

# Load accident history dataset
accident_data = pd.read_csv("accident_data.csv")
print("Accident History Dataset Loaded Successfully!\n")
print(accident_data.head())

# Convert accident data into a dictionary for quick lookup
accident_dict = {}
for _, row in accident_data.iterrows():
    key = (row["Source"], row["Destination"], row["Mode of Travel"])
    accident_dict[key] = {
        "Accident Count": row["Number of Accidents"],
        "Severity": row["Severity"],
         "Weather": row["Weather"] 
    }

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get user input from request
        data = request.json
        source = data.get("source")
        destination = data.get("destination")
        mode_of_travel = data.get("mode_of_travel")

        # Check accident history
        accident_info = accident_dict.get((source, destination, mode_of_travel), None)

        # Prediction logic based on accident data
        if accident_info:
            num_accidents = accident_info["Accident Count"]
            severity = accident_info["Severity"]
            accident_weather = accident_info["Weather"]

            # Determine safety based on accident severity
            if num_accidents > 10 and severity in ["Severe", "Moderate"]:
                return jsonify({
                    "message": "Your travel is **not safe** ❌",
                    "reason": f"High accident history ({num_accidents} accidents, {severity} severity) during {accident_weather} weather."
                })
            else:
                return jsonify({
                    "message": "Your travel is safe ✅",
                    "reason": f"Accident history: {num_accidents} accidents, {severity} severity."
                })

        else:
            return jsonify({
                "message": "Your travel is safe ✅",
                "reason": "No recorded accidents for this route."
            })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)

'''