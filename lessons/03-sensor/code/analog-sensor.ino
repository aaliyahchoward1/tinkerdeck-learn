/*
  Analog Sensor with LED Control

  Reads an analog sensor (potentiometer or light sensor) on pin A0.
  Controls LED brightness on pin 5 based on sensor value.
  Outputs sensor reading to Serial Monitor.

  PWM pins on Arduino Uno: 3, 5, 6, 9, 10, 11

  This example code is in the public domain.
*/

const int SENSOR_PIN = A0;  // Analog input pin
const int LED_PIN = 5;      // PWM-capable digital output pin

// Calibration values - adjust based on your sensor
const int MIN_READING = 0;
const int MAX_READING = 1023;

void setup() {
  Serial.begin(9600);       // Start serial communication at 9600 baud
  pinMode(LED_PIN, OUTPUT); // LED pin is output
  // Analog pins are inputs by default - no pinMode needed
}

void loop() {
  // Read the sensor value (0-1023)
  int sensorValue = analogRead(SENSOR_PIN);

  // Map sensor value to brightness range (0-255)
  int brightness = map(sensorValue, MIN_READING, MAX_READING, 0, 255);

  // Constrain the value to valid range (just in case)
  brightness = constrain(brightness, 0, 255);

  // Set LED brightness using PWM
  analogWrite(LED_PIN, brightness);

  // Print sensor value to Serial Monitor for debugging
  Serial.print("Sensor: ");
  Serial.print(sensorValue);
  Serial.print(" -> Brightness: ");
  Serial.println(brightness);

  // Small delay to reduce noise and Serial output speed
  delay(50);
}
