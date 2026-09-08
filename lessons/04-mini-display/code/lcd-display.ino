/*
  LCD Display Example

  Displays text on a 16x2 LCD screen connected via I2C.

  LCD I2C Module pins:
  - GND → Arduino GND
  - VCC → Arduino +5V
  - SDA → Arduino A4
  - SCL → Arduino A5

  Library: LiquidCrystal_I2C (Frank de Brabander)

  Common I2C addresses:
  - 0x27 (most common)
  - 0x3F (alternative)

  If display doesn't work, try changing the address.
  Use i2c_scanner.ino to find the correct address.

  This example code is in the public domain.
*/

#include <LiquidCrystal_I2C.h>

// Set the LCD address to 0x27 (16 chars, 2 line display)
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Serial.begin(9600);

  // Initialize the LCD
  lcd.init();

  // Turn on the backlight
  lcd.backlight();

  // Print a message to the LCD on the first row
  lcd.setCursor(0, 0);
  lcd.print("Hello, Arduino!");

  // Print a message to the LCD on the second row
  lcd.setCursor(0, 1);
  lcd.print("LCD Works!");

  Serial.println("LCD Initialized");
}

void loop() {
  // Display a counter that increments every second
  for (int i = 0; i < 60; i++) {
    // Clear only the second line (not the first)
    lcd.setCursor(0, 1);
    lcd.print("                "); // Clear line with spaces

    // Display the counter on row 1
    lcd.setCursor(0, 1);
    lcd.print("Count: ");
    lcd.print(i);

    Serial.print("Count: ");
    Serial.println(i);

    delay(1000);  // Wait 1 second
  }

  // After counting to 60, clear the display and restart
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Restarting...");
  delay(2000);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Hello, Arduino!");
  lcd.setCursor(0, 1);
  lcd.print("LCD Works!");
  delay(2000);
}
