/*
  LCD Display with Sensor Data

  Displays analog sensor readings on an LCD screen in real-time.

  This example shows how to:
  - Read sensor input (like Lesson 3)
  - Display the values on an LCD
  - Update the display continuously

  Customize the sensor type and display format for your needs!

  This example code is in the public domain.
*/

#include <LiquidCrystal_I2C.h>

// LCD setup
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Sensor setup
const int SENSOR_PIN = A0;
const int LED_PIN = 5;

void setup() {
  Serial.begin(9600);

  // Initialize LCD
  lcd.init();
  lcd.backlight();

  // Initialize pins
  pinMode(LED_PIN, OUTPUT);

  // Display startup message
  lcd.setCursor(0, 0);
  lcd.print("Sensor Monitor");
  lcd.setCursor(0, 1);
  lcd.print("Starting...");

  delay(2000);  // Show message for 2 seconds
}

void loop() {
  // Read sensor value
  int sensorValue = analogRead(SENSOR_PIN);

  // Map to brightness (0-255)
  int brightness = map(sensorValue, 0, 1023, 0, 255);

  // Control LED brightness
  analogWrite(LED_PIN, brightness);

  // Clear and update display
  lcd.clear();

  // Line 1: Sensor reading
  lcd.setCursor(0, 0);
  lcd.print("Sensor: ");
  lcd.print(sensorValue);

  // Line 2: Brightness level
  lcd.setCursor(0, 1);
  lcd.print("LED: ");
  lcd.print(brightness);

  // Also print to Serial for monitoring
  Serial.print("Sensor: ");
  Serial.print(sensorValue);
  Serial.print(" -> LED: ");
  Serial.println(brightness);

  delay(200);  // Update display every 200ms
}
