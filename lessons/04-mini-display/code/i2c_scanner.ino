/*
  I2C Scanner

  Scans all I2C addresses (0-127) and prints those that respond.
  Use this to find the address of your I2C LCD display if you're unsure.

  Most I2C LCDs use 0x27 or 0x3F

  This example code is in the public domain.
*/

#include <Wire.h>

void setup() {
  Wire.begin();
  Serial.begin(9600);

  Serial.println("\nI2C Scanner");
  Serial.println("Scanning for I2C devices...\n");

  byte error, address;
  int nDevices;

  nDevices = 0;

  for (address = 1; address < 127; address++) {
    // The i2c_scanner uses the return value of
    // the Write.endTransmisstion to see if
    // a device did acknowledge to the address.
    Wire.beginTransmission(address);
    error = Wire.endTransmission();

    if (error == 0) {
      Serial.print("I2C device found at address 0x");
      if (address < 16) {
        Serial.print("0");
      }
      Serial.print(address, HEX);
      Serial.println("  !");

      nDevices++;
    } else if (error == 4) {
      Serial.print("Unknown error at address 0x");
      if (address < 16) {
        Serial.print("0");
      }
      Serial.println(address, HEX);
    }
  }

  if (nDevices == 0) {
    Serial.println("No I2C devices found\n");
  } else {
    Serial.println("scan complete\n");
  }

  delay(5000);  // Wait 5 seconds before next scan
}

void loop() {
  // Scan is only done in setup()
}
