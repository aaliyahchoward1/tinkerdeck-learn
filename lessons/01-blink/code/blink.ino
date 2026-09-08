/*
  Blink

  Turns an LED on for one second, then off for one second, repeatedly.

  This example code is in the public domain.
*/

const int LED_PIN = 13;  // Pin where LED is connected

void setup() {
  // Initialize digital pin LED_PIN as an output
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  // Turn the LED on (HIGH is the voltage level)
  digitalWrite(LED_PIN, HIGH);
  delay(1000);  // Wait for a second (1000 milliseconds)

  // Turn the LED off by making the voltage LOW
  digitalWrite(LED_PIN, LOW);
  delay(1000);  // Wait for a second
}
