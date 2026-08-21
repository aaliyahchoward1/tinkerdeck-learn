/*
  Button Control LED

  Reads a button connected to pin 2.
  When pressed, turns on an LED connected to pin 13.
  When released, turns off the LED.

  This example code is in the public domain.
*/

const int BUTTON_PIN = 2;
const int LED_PIN = 13;

void setup() {
  // Configure pins
  pinMode(BUTTON_PIN, INPUT);   // Button is an input
  pinMode(LED_PIN, OUTPUT);      // LED is an output
}

void loop() {
  // Read the button state (HIGH when pressed, LOW when released)
  int buttonState = digitalRead(BUTTON_PIN);

  // Control LED based on button state
  if (buttonState == HIGH) {
    // Button is pressed - turn LED on
    digitalWrite(LED_PIN, HIGH);
  } else {
    // Button is released - turn LED off
    digitalWrite(LED_PIN, LOW);
  }

  // Small delay for debouncing (allows button contacts to settle)
  delay(20);
}
