# Analog Sensor Lesson - Troubleshooting Guide

## LED Doesn't Change Brightness

### Problem: LED always off or always full brightness
**Possible Causes & Solutions:**

1. **Wrong pin number**
   - Code says `LED_PIN = 5`, but LED wired to different pin?
   - Change to match your wiring, OR
   - Move LED to pin 5
   - Remember: only pins 3, 5, 6, 9, 10, 11 support `analogWrite()`

2. **Using non-PWM pin**
   - Pin 13 does NOT support PWM
   - Pin 5 is better for this lesson
   - Check your pin supports `analogWrite()` - refer to Arduino Uno pinout

3. **sensor stuck at 0 or 1023**
   - See "Sensor Reading Problems" below

4. **Code not uploaded**
   - Made changes? Click Upload button again
   - Wait for "Done uploading" message

5. **Sensor not wired to A0**
   - Check code: `analogRead(SENSOR_PIN)` - what's the pin?
   - Verify sensor actually connected to that analog pin

### Problem: LED brightness changes, but wrong direction
**Possible Causes & Solutions:**

1. **Inverted response is normal!**
   - Photoresistor: bright = LOW voltage = low reading
   - Potentiometer: turn CW might decrease instead of increase
   - Either reverse sensor wiring OR reverse map range:
   ```cpp
   int brightness = map(sensorValue, 1023, 0, 0, 255);  // Reversed
   ```

2. **Calibration values are backward**
   - If using custom MIN/MAX values:
   ```cpp
   const int MIN_READING = 0;    // Minimum expected sensor value
   const int MAX_READING = 1023; // Maximum expected sensor value
   ```
   - If reversed, swap them

## Sensor Reading Problems

### Problem: Sensor always reads 0
**Possible Causes & Solutions:**

1. **Sensor not connected to correct pin**
   - Code says `A0`, but wired to `A1`, `A2`, etc.?
   - Check physical connections
   - Update code to match, or rewire to A0

2. **Potentiometer wired wrong**
   - Middle pin MUST go to A0
   - Left to +5V, Right to GND (or vice versa, but middle to A0)
   - Try rotating knob - should see change in Serial Monitor

3. **Photoresistor: no +5V connection**
   - One end MUST connect to +5V
   - Other end to A0
   - Then 10kΩ resistor from A0 to GND
   - Check all three connections solid

4. **Loose connections**
   - Reseat jumper wires in breadboard
   - Sensor might need firmer push

### Problem: Sensor always reads 1023 (maximum)
**Possible Causes & Solutions:**

1. **Photoresistor wired wrong**
   - Missing 10kΩ pull-down resistor to GND
   - A0 must connect to resistor which goes to GND
   - Double-check this critical connection

2. **Open circuit**
   - No complete path for current
   - Check both ends of photoresistor connected
   - Verify resistor isn't broken (measure with multimeter if possible)

3. **Potentiometer: all pins not connected**
   - All three potentiometer pins MUST be used
   - Left: +5V, Middle: A0, Right: GND
   - Don't leave any pins floating

### Problem: Sensor readings jitter/fluctuate wildly
**Possible Causes & Solutions:**

1. **No debouncing delay**
   - Add or increase delay:
   ```cpp
   delay(50);  // At least 20-50ms recommended
   ```

2. **Noise from environment**
   - Long sensor wires pick up interference
   - Keep wiring short
   - Keep away from USB cables and electronics

3. **Filtering needed**
   - Implement averaging:
   ```cpp
   int sum = 0;
   for (int i = 0; i < 10; i++) {
     sum += analogRead(SENSOR_PIN);
   }
   int smoothedValue = sum / 10;
   ```

4. **Bad breadboard connection**
   - Breadboard contacts wear out
   - Try different holes on breadboard
   - Replace jumper wires

## Serial Monitor Issues

### Problem: Can't see Serial output
**Possible Causes & Solutions:**

1. **Serial Monitor not open**
   - Tools → Serial Monitor
   - Should show a window with data

2. **Wrong baud rate**
   - Code says `Serial.begin(9600)`
   - Serial Monitor must match: 9600 baud
   - It's a dropdown in bottom right of Serial Monitor

3. **Wrong COM port selected**
   - Tools → Port → Select your Arduino's port
   - Usually COM3 or COM4 on Windows, /dev/ttyUSB0 on Linux

4. **Code not actually calling Serial.println()**
   - Check your code has these lines:
   ```cpp
   Serial.begin(9600);       // In setup()
   Serial.println(sensorValue);  // In loop()
   ```

### Problem: Serial Monitor shows garbage characters
**Possible Causes & Solutions:**

1. **Baud rate mismatch**
   - Code: `Serial.begin(9600)` means 9600 baud
   - Change Serial Monitor dropdown to 9600
   - Ensure they match exactly

## Calibration Problems

### Problem: Full range of sensor not used
**Possible Causes & Solutions:**

1. **Sensor range different than expected**
   - Potentiometer: should give 0-1023
   - Photoresistor: depends on environment (might be 200-800)
   - Check actual values with Serial Monitor

2. **Calibration values need adjustment**
   - Watch Serial Monitor output
   - Note minimum and maximum values you see
   - Update code:
   ```cpp
   const int MIN_READING = 150;  // Actual minimum you observed
   const int MAX_READING = 900;  // Actual maximum you observed
   ```

3. **Reversed range**
   - If LED goes bright when sensor says low:
   ```cpp
   int brightness = map(sensorValue, MAX_READING, MIN_READING, 0, 255);
   ```
   - Swaps the input range direction

## Code Problems

### Problem: "analogWrite is not declared" error
**Possible Causes & Solutions:**

1. **Typo in function name**
   - Check spelling: `analogWrite` (not `analog_write` or `AnalogWrite`)
   - Case sensitive!

2. **Wrong include or library**
   - `analogWrite()` is built-in - no library needed
   - Just make sure it's spelled correctly

### Problem: LED brightness doesn't smoothly change
**Possible Causes & Solutions:**

1. **Using wrong output function**
   - Must use `analogWrite()` for PWM
   - `digitalWrite()` only supports ON/OFF
   - Check your code

2. **Not using PWM pin**
   - `analogWrite()` only works on pins 3, 5, 6, 9, 10, 11
   - Using pin 13? Switch to pin 5
   - Code must match physical pin

3. **map() function wrong**
   - Syntax: `map(value, fromLow, fromHigh, toLow, toHigh)`
   - Example: `map(sensorValue, 0, 1023, 0, 255)`
   - Order matters!

## Advanced Debugging

### Debug Checklist:

1. **Serial Monitor test:**
   - Does it show changing numbers as you adjust sensor?
   - If yes: sensor works
   - If no: sensor circuit problem

2. **LED test:**
   - Does `analogWrite(LED_PIN, 255)` make it bright?
   - Does `analogWrite(LED_PIN, 0)` turn it off?
   - If no: LED circuit problem

3. **Combination test:**
   - Check that mapping is correct
   - For sensor value X, what should brightness be?
   - Does LED actually have that brightness?

### Serial Monitor Diagnostic Code:

```cpp
void loop() {
  int rawValue = analogRead(SENSOR_PIN);
  int brightness = map(rawValue, 0, 1023, 0, 255);
  
  Serial.print("Raw: ");
  Serial.print(rawValue);
  Serial.print(" -> Brightness: ");
  Serial.println(brightness);
  
  analogWrite(LED_PIN, brightness);
  
  delay(100);
}
```

Watch Serial Monitor and compare displayed values to actual LED brightness.

## Success Checklist

✓ Sensor value changes with input (Serial Monitor shows change)
✓ LED brightness changes smoothly as sensor changes
✓ Full range used (brightness from dim to bright)
✓ No flickering or jitter (if there is, increase delay or filter)
✓ Response is immediate (< 100ms lag)
✓ Behavior matches expectation (bright sensor → bright LED, etc.)

## Quick Fix Flowchart

1. Check Serial Monitor - does sensor value change?
   - NO → Sensor circuit problem (check connections)
   - YES → Continue to step 2

2. Check with `analogWrite(LED_PIN, 255)` - is LED on?
   - NO → LED circuit or wrong pin
   - YES → Continue to step 3

3. Check with constant `analogWrite(LED_PIN, 128)` - is LED medium?
   - NO → Might not be using PWM pin
   - YES → Code logic issue

4. Compare Serial output to actual LED brightness
   - Should match proportionally
   - If inverted, reverse map range

Good luck! 💡
