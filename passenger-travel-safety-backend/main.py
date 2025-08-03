from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")  # Allow all origins

model = joblib.load("model.pkl")
accident_data = pd.read_csv("accident_data.csv")

def get_accident_count(source, destination, mode):
    match = accident_data[
        ((accident_data["Source"] == source) & (accident_data["Destination"] == destination)) |
        ((accident_data["Source"] == destination) & (accident_data["Destination"] == source))
    ]
    match = match[match["Mode"] == mode]
    if not match.empty:
        return int(match["Accident_Count"].mean())
    else:
        return 0

@app.route('/')
def home():
    return "🚀 Backend is running with ML model!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print("Received Data from frontend:", data)

    # Convert frontend keys to backend expected keys
    key_map = {
        "heartDisease": "heart_disease",
        "mobilityIssues": "mobility_issues",
        "respiratoryIssues": "respiratory_issues"
    }
    for frontend_key, backend_key in key_map.items():
        if frontend_key in data:
            data[backend_key] = data[frontend_key]

    # Required fields
    required_fields = ["age", "heart_disease", "mobility_issues", "hypertension", "respiratory_issues",
                       "source", "destination", "mode", "severity", "weather"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    # Convert input values
    try:
        age = int(data["age"])
        def yn_to_int(value): return 1 if str(value).lower() == 'yes' else 0
        heart_disease = yn_to_int(data["heart_disease"])
        mobility_issues = yn_to_int(data["mobility_issues"])
        hypertension = yn_to_int(data["hypertension"])
        respiratory_issues = yn_to_int(data["respiratory_issues"])
        source = data["source"]
        destination = data["destination"]
            # Emoji-safe mappings for model input
        mode_mapping = {
        "Road 🚗": "Road",
        "Air ✈️": "Air",
        "Train 🚆": "Train"
        }
        weather_mapping = {
                "Clear ☀️": "Clear",
                "Rainy 🌧️": "Rainy",
                "Stormy ⛈️": "Stormy",
                "Cool 🌥️": "Cool",
                "Hot 🔥": "Hot",
                "Cloudy ⛅": "Cloudy",
                "Foggy 🌫️": "Foggy",
                "Humid 🌡️": "Humid",
                "Sunny ☀️": "Sunny",
                "Windy 💨": "Windy"
            }

        mode = mode_mapping.get(data["mode"], data["mode"])
        weather = weather_mapping.get(data["weather"], data["weather"])

        severity = data["severity"]
        
        accident_count = get_accident_count(source, destination, mode)

        # Build input for model
        input_data = {
            'Age': age,
            'Heart_Disease': heart_disease,
            'Mobility_Issues': mobility_issues,
            'Hypertension': hypertension,
            'Respiratory_Issues': respiratory_issues,
            'Accident_Count': accident_count,
            'Severity_' + severity: 1,
            'Weather_' + weather: 1,
            'Mode_' + mode: 1,
            'Source_' + source: 1,
            'Destination_' + destination: 1
        }

        model_columns = model.feature_names_in_
        final_input = {col: input_data.get(col, 0) for col in model_columns}
        input_df = pd.DataFrame([final_input])
        model_prediction = model.predict(input_df)[0]

        # 🧠 Custom Rule-Based Reasoning
        reasons = []

        # Age-related
        if age >= 65 and mode == 'Road':
            reasons.append("Your age is high and road travel might be risky.\n")
        if age <= 10 and mode == 'Air':
            reasons.append("Young children may face issues with air travel.\n")

        # Weather-related
        if weather in ['Rainy', 'Stormy', 'Foggy']:
            if (mode == 'Road' and (weather == 'Stromy' or weather == 'Foggy')):
                reasons.append("bad weather condition for road travel.\n")
            elif mode == 'Air':
                reasons.append("weather may cause air travel delays or turbulence.\n")
            elif mode == 'Train':
                reasons.append("train travel may be delayed due to weather.\n")

        # Health-related
        if (heart_disease or respiratory_issues) and mode == 'Air':  
            reasons.append("your health condition that may not support air travel.\n")
        if mobility_issues and mode == 'Train':
            reasons.append("mobility issues that may worsen in crowded trains.\n")
        if hypertension and mode == 'Road':
            reasons.append("long road trips that may not be safe for hypertension patients.\n")

        # Accident history
        if accident_count > 5:
            reasons.append("the past travel  history of this route have several accidents so make sure your safety during the travel.\n")

        # Final Message Formatting
        if model_prediction == 0 or len(reasons) > 0:
            alt_modes = ['Air', 'Train', 'Road']
            if mode in alt_modes:
                alt_modes.remove(mode)
            suggestion = f"You may consider alternative travel options like {', '.join(alt_modes)} if weather and health conditions permits."
            reason_text = "<br>🔸 " + "<br>🔸 ".join(reason.strip() for reason in reasons)
            message = f"""<b>❗Your travel is not safe due to the following reasons:</b><br>{reason_text}<br><br>
💡 <b>You may consider alternative travel options like {', '.join(alt_modes)} if weather and health conditions permit.</b><br>
🔊 <b>Please reconsider your travel and proceed only if necessary. Ensure that you take all safety measures before your travel.</b>"""

            prediction = 0
        else:
            message = "✅ Your travel is safe. Happy journey! 😊"
            prediction = 1

        return jsonify({
            "prediction": prediction,
            "accident_count": accident_count,
            "message": message
        })

    except Exception as e:
        print("Prediction Error:", str(e))
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
