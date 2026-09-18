# Blink Lesson - Troubleshooting Guide

## LED Doesn't Light Up

### Problem: LED never turns on, even after uploading
**Possible Causes & Solutions:**

1. **LED is backwards**
   - LEDs only work one direction
   - Flip the LED 180° and try again
   - Longer leg = positive, shorter leg = negative

2. **Resistor value too high**
   - Try a 470Ω resistor instead of 220Ω
   - Too much resistance reduces brightness

3. **Loose connections**
   - Check that all wires are fully inserted
   - Push components down firmly into breadboard
   - Breadboard holes can get loose over time

4. **Wrong pin number**
   - Make sure you're using pin 13 (or change code to match your pin)
   - Count from top: Pin 0 is RX, Pin 1 is TX, then pins 2-13

5. **Broken LED**
   - Try a different LED - they can fail
   - Look for cracks or blackening inside

### Problem: LED is very dim
**Possible Causes & Solutions:**

1. **Resistor too high**
   - 220Ω is typical; try 100Ω or 150Ω for brighter
   - Don't go below 100Ω (dangerous for LED and Arduino)

2. **Poor connection**
   - Reseat all wires and components
   - Clean breadboard contacts with eraser if dirty

3. **LED getting old**
   - LEDs degrade over time
   - Replace with a new one

## Upload Problems

### Problem: "Port or serial port not found" error
**Possible Causes & Solutions:**

1. **Arduino not connected**
   - Check USB cable is plugged into computer and Arduino
   - Try a different USB port

2. **Wrong board selected**
   - Go to Tools → Board → Select "Arduino Uno"
   - Go to Tools → Port → Select the correct COM port

3. **USB driver not installed**
   - Windows users: download CH340 driver if using clone board
   - Mac/Linux: usually works automatically

4. **Bad USB cable**
   - Try a different USB cable (some are charge-only)
   - USB must be data-capable

### Problem: "Compilation failed" error
**Possible Causes & Solutions:**

1. **Typo in code**
   - Check spelling of function names: `digitalWrite`, `delay`, `pinMode`
   - Watch for missing semicolons at end of lines
   - Check parentheses match: `()`, `{}`, `[]`

2. **Wrong code copied**
   - Re-copy the code from the lesson
   - Watch for hidden characters

3. **Arduino IDE outdated**
   - Update to latest version

## Code Problems

### Problem: LED doesn't blink, just stays on
**Possible Causes & Solutions:**

1. **Wrong pin configuration**
   - Make sure `const int LED_PIN = 13;` matches your actual pin
   - Make sure `pinMode(LED_PIN, OUTPUT);` is in `setup()`

2. **Missing delay()**
   - Make sure you have `delay(1000);` after each `digitalWrite()`
   - Without delay, blink is too fast to see

3. **Infinite loop**
   - The `loop()` function should run forever - that's normal!
   - Press Ctrl+C in IDE serial monitor to stop sketch

### Problem: Sketch compiles but nothing happens
**Possible Causes & Solutions:**

1. **Didn't press Upload**
   - Click the Upload button (arrow icon)
   - Wait for "Done uploading" message

2. **Arduino not powered**
   - USB cable must be connected
   - Arduino board should have a green LED on it

3. **Wrong upload speed**
   - Go to Tools → Upload Speed → 115200
   - Usually correct by default

## Hardware Problems

### Problem: Arduino board won't respond
**Possible Causes & Solutions:**

1. **Arduino is frozen**
   - Press the reset button on the Arduino
   - Wait 2 seconds and try uploading again

2. **Burnt out pin**
   - Try a different pin number
   - If multiple pins fail, Arduino might be damaged

3. **Computer USB port issue**
   - Try different USB port
   - Unplug and replug the cable

## Modification Troubleshooting

### Problem: Changed code but LED behavior didn't change
**Possible Causes & Solutions:**

1. **Forgot to upload**
   - After changing code, you must click Upload
   - IDE doesn't automatically update Arduino

2. **Code has syntax errors**
   - IDE shows red error messages
   - Check the error message and fix the line

3. **Changes didn't save**
   - Save your changes: Ctrl+S (or Cmd+S on Mac)
   - Then upload

## Success Checklist

✓ LED blinks on and off regularly
✓ Blink speed is about 1 second on, 1 second off
✓ No error messages in IDE
✓ USB cable stays connected during operation
✓ Arduino board is cool to touch (not hot)

If none of this works, try the **nuclear option**:
1. Disconnect everything
2. Close IDE completely
3. Restart computer
4. Unplug USB and plug back in
5. Open IDE and try again

Good luck! 🔧
