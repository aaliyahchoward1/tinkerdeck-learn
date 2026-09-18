# LCD Display Lesson - Troubleshooting Guide

## LCD Display Won't Turn On

### Problem: Display is completely dark, no light, no text
**Possible Causes & Solutions:**

1. **Power not connected**
   - Check VCC → +5V connection
   - Check GND → GND connection
   - Try measuring voltage with multimeter if available

2. **Backlight is off**
   - Some displays have backlight turned off by default
   - Try adjusting the potentiometer on the I2C module
   - Or add `lcd.backlight();` to your code

3. **Wrong I2C address**
   - Display won't initialize if address is incorrect
   - Use i2c_scanner.ino to find the correct address
   - Update code: `LiquidCrystal_I2C lcd(0x???, 16, 2);`

4. **SDA/SCL not connected**
   - Check A4 (SDA) connection
   - Check A5 (SCL) connection
   - These are critical for I2C communication

5. **Library not installed**
   - Go to Sketch → Include Library → Manage Libraries
   - Search for "LiquidCrystal I2C"
   - Install version by Frank de Brabander

6. **Loose connections**
   - Reseat all 4 jumper wires firmly
   - Try different breadboard holes
   - Replace jumper wires if they look worn

### Problem: Display shows wrong I2C address error
**Possible Causes & Solutions:**

1. **Wrong address in code**
   - Common addresses: 0x27 and 0x3F
   - Use i2c_scanner.ino to find the real address
   - Your display might use a different address

2. **I2C communication broken**
   - Check SDA (A4) and SCL (A5) are connected
   - Verify no loose wires
   - Try a different cable if available

3. **Library outdated**
   - Update library through Library Manager
   - Remove and reinstall if needed

## No Text Displayed

### Problem: Backlight is on but no characters visible
**Possible Causes & Solutions:**

1. **Contrast is too high or too low**
   - Find the potentiometer on the I2C module (small blue box)
   - Turn it slowly with a small screwdriver
   - Try both directions to find the sweet spot

2. **Wrong I2C address**
   - Display initializes but doesn't respond to commands
   - Run i2c_scanner.ino to find correct address
   - Update code and re-upload

3. **Initialization failed**
   - Make sure code includes:
   ```cpp
   lcd.init();
   lcd.backlight();
   ```
   - Check for any error messages in Serial Monitor

4. **Data pins (SDA/SCL) swapped**
   - SDA must go to A4
   - SCL must go to A5
   - If swapped, display won't communicate

### Problem: Text appears garbled or random characters
**Possible Causes & Solutions:**

1. **Wrong LCD dimensions in code**
   - Code says `16x2` but display is `20x4` (or vice versa)?
   - Check actual display: count characters and rows
   - Update initialization: `LiquidCrystal_I2C lcd(0x27, 20, 4);`

2. **Wrong I2C address**
   - Even if it displays something, wrong address causes garbage
   - Use i2c_scanner.ino to verify address
   - Update code with correct address

3. **Library conflict**
   - Multiple LCD libraries might be installed
   - Make sure you're using LiquidCrystal_I2C (by Frank de Brabander)
   - Remove other LCD libraries if present

## Serial Monitor Issues

### Problem: Code won't upload
**Possible Causes & Solutions:**

1. **Syntax error in code**
   - Check for spelling mistakes
   - Common: missing semicolons, brackets, parentheses
   - IDE highlights errors in red

2. **Library not included**
   - Make sure code has: `#include <LiquidCrystal_I2C.h>`
   - Check library is installed

3. **Wrong Arduino selected**
   - Tools → Board → Arduino Uno
   - Tools → Port → Select correct COM port

### Problem: Code compiles but nothing happens
**Possible Causes & Solutions:**

1. **Display address is wrong**
   - Serial Monitor doesn't show address errors
   - Use i2c_scanner.ino to find address
   - Update code and re-upload

2. **Didn't re-upload after changes**
   - Made code changes? Must click Upload again
   - IDE doesn't automatically update Arduino

3. **Arduino didn't restart**
   - Press Reset button on Arduino
   - Or unplug USB and plug back in

## Library Problems

### Problem: "LiquidCrystal_I2C" not found
**Possible Causes & Solutions:**

1. **Library not installed**
   - Sketch → Include Library → Manage Libraries
   - Search "LiquidCrystal I2C"
   - Install by Frank de Brabander
   - Restart Arduino IDE after installing

2. **Wrong library installed**
   - Make sure it's the I2C version, not regular LiquidCrystal
   - The I2C version uses fewer pins

3. **Typo in include statement**
   - Check spelling: `#include <LiquidCrystal_I2C.h>`
   - Capitalization matters!

### Problem: Compilation errors mentioning "lcd.init()"
**Possible Causes & Solutions:**

1. **Wrong library**
   - Some LCD libraries don't have `.init()`
   - Make sure you're using LiquidCrystal_I2C (by Frank de Brabander)
   - Check Tools → Manage Libraries for the exact name

2. **Missing library**
   - Install the library if not already done
   - Restart IDE after installing

## Communication Problems

### Problem: I2C Scanner finds no devices
**Possible Causes & Solutions:**

1. **Power not connected**
   - Check VCC → +5V
   - Check GND → GND
   - Verify with multimeter if available

2. **SDA and SCL not connected**
   - A4 (SDA) connection missing or loose
   - A5 (SCL) connection missing or loose
   - Try different breadboard holes

3. **I2C module broken**
   - Try a different LCD module if available
   - Check for visible damage on I2C converter

4. **Arduino pin damaged**
   - Try connecting to a different Arduino
   - Or try using a different pair of I2C pins (if your Arduino supports it)

### Problem: I2C Scanner finds device but LCD doesn't work
**Possible Causes & Solutions:**

1. **Address found but LCD initialization fails**
   - Scanner found: 0x27
   - But still nothing displays?
   - Try the exact address from scanner
   - Copy-paste the hex address to avoid typos

2. **LCD library mismatch**
   - Address might be correct, but library can't talk to display
   - Try updating to latest LiquidCrystal_I2C library
   - Or try alternative library: "LiquidCrystal I2C" by Blackhawk

3. **Display too dim/bright after initialization**
   - Contrast potentiometer might be wrong
   - Adjust the tiny potentiometer on I2C module

## Advanced Debugging

### Use Serial Monitor to debug:

```cpp
void setup() {
  Serial.begin(9600);
  
  Serial.println("Initializing LCD...");
  lcd.init();
  
  Serial.println("Turning on backlight...");
  lcd.backlight();
  
  Serial.println("Setting cursor to 0,0...");
  lcd.setCursor(0, 0);
  
  Serial.println("Printing text...");
  lcd.print("Hello!");
  
  Serial.println("Setup complete");
}

void loop() {}
```

If Serial Monitor shows "Setup complete" but LCD is blank:
- Problem is likely with contrast or address
- Run i2c_scanner.ino again

If Serial Monitor doesn't print anything:
- Problem is earlier (likely power or library)

### I2C Scanner Output Example:

```
I2C Scanner
Scanning for I2C devices...

I2C device found at address 0x27 !

scan complete
```

If you see a different address (like 0x3F), update your code with that address.

## Success Checklist

✓ LCD backlight turns on
✓ Text displays correctly (adjust contrast if needed)
✓ Text updates when you change the code
✓ No garbled characters
✓ I2C Scanner finds device at expected address
✓ Sensor data displays in real-time

## Quick Fix Flowchart

1. **Is backlight on?**
   - NO → Check power (VCC and GND), adjust contrast
   - YES → Continue to step 2

2. **Does I2C Scanner find device?**
   - NO → Check SDA (A4) and SCL (A5) connections
   - YES → Note the address and continue to step 3

3. **Does your code use the correct address?**
   - NO → Update address in `LiquidCrystal_I2C lcd(ADDRESS, 16, 2);`
   - YES → Continue to step 4

4. **Is text displaying?**
   - NO → Adjust contrast potentiometer
   - YES → Success! ✓

## Common Questions

**Q: Can I use a 20x4 display instead of 16x2?**
A: Yes! Change initialization to: `LiquidCrystal_I2C lcd(0x27, 20, 4);`

**Q: Can I connect the display to different pins?**
A: No. I2C LCD must use A4 (SDA) and A5 (SCL) on Arduino Uno.

**Q: Why is my text slowly appearing/disappearing?**
A: Adjust the contrast potentiometer on the I2C module.

**Q: Can I run multiple I2C devices?**
A: Yes! They can share SDA (A4) and SCL (A5) as long as they have different addresses.

Good luck! 📺
