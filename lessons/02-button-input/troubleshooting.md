# Button Input Lesson - Troubleshooting Guide

## Button Not Responding

### Problem: Pressing button has no effect
**Possible Causes & Solutions:**

1. **Missing or wrong pull-down resistor**
   - Check 10kΩ resistor is connected from Pin 2 to GND
   - If you use 1kΩ or 100kΩ, it might not work properly
   - The resistor value matters!

2. **Button legs not fully inserted**
   - Push button down firmly into breadboard
   - Check all four legs make contact
   - Try wiggling button slightly to seat properly

3. **Wrong pin number**
   - Code says `BUTTON_PIN = 2`, but wired to different pin?
   - Change code to match your actual pin, or re-wire to pin 2

4. **Reversed button logic**
   - Try inverting the if statement:
   ```cpp
   if (buttonState == LOW) {  // Opposite of HIGH
     digitalWrite(LED_PIN, HIGH);
   }
   ```

5. **Button is stuck**
   - Physical button may be broken
   - Try a different button to test
   - Press firmly to ensure contact

6. **Loose connections**
   - Check all jumper wires are fully inserted
   - Reseat the button and resistor

### Problem: Button press detected, but LED doesn't light
**Possible Causes & Solutions:**

1. **LED circuit is broken**
   - Same troubleshooting as Lesson 1 (check LED orientation, resistor value)
   - Test by connecting LED to blink from Lesson 1 code

2. **Wrong LED pin**
   - Code says `LED_PIN = 13`, verify LED is actually on pin 13
   - Or update code to match your actual LED pin

3. **LED and button working, but backwards**
   - Try swapping the if/else blocks:
   ```cpp
   if (buttonState == HIGH) {
     digitalWrite(LED_PIN, LOW);   // OFF instead of ON
   } else {
     digitalWrite(LED_PIN, HIGH);  // ON instead of OFF
   }
   ```

## Button is Twitchy/Jittery

### Problem: LED flickers or doesn't respond consistently
**Possible Causes & Solutions:**

1. **Debouncing delay too short**
   - Increase delay from 20ms to 50ms:
   ```cpp
   delay(50);
   ```
   - Button contacts bounce for ~20-50ms when pressed

2. **Pull-down resistor value too high**
   - 10kΩ is standard; values above 100kΩ can cause issues
   - Try 10kΩ (standard) or 4.7kΩ (also common)

3. **Loose breadboard connections**
   - Breadboard contacts get dirty or loose over time
   - Reseat all components
   - Try replacing jumper wires if they look corroded

4. **Electromagnetic interference**
   - Long wires can pick up noise
   - Keep button wiring short
   - Route away from USB cable or other electronics

## Button Always Reads as Pressed

### Problem: LED stays on even when button not pressed
**Possible Causes & Solutions:**

1. **Button is stuck mechanically**
   - Remove button and test with a jumper wire
   - If behavior changes, button is broken

2. **Pull-down resistor not connected to GND**
   - Check 10kΩ resistor connects TO GND (ground)
   - Not to +5V or floating

3. **Short circuit**
   - Check that Button → +5V connection and Button → GND path don't cross
   - Pins should not touch each other accidentally

4. **Wrong resistor value**
   - If 10kΩ appears connected but doesn't work, measure with multimeter
   - Resistor might be damaged or wrong color-coded value

## Button Always Reads as Released

### Problem: Button press not detected at all
**Possible Causes & Solutions:**

1. **Button not connected to +5V**
   - Check one button leg reaches +5V power rail
   - Follow the wire from button all the way to power

2. **Pin 2 not connected to button**
   - Verify jumper wire goes from Arduino Pin 2 to button leg
   - Trace the connection carefully

3. **Short between Pin 2 and GND**
   - A loose wire might be bridging Pin 2 to GND
   - Check for accidental connections
   - Test with a multimeter if available

4. **Arduino pin damaged**
   - Try using Pin 3 or 4 instead
   - Update code: `const int BUTTON_PIN = 3;`
   - If it works, your original pin might be damaged

## Upload/Code Problems

### Problem: Code compiles but behavior is wrong
**Possible Causes & Solutions:**

1. **Didn't re-upload after changes**
   - After modifying code, must click Upload again
   - IDE doesn't automatically update Arduino

2. **Wrong logic in if statement**
   - Double-check if statement syntax:
   ```cpp
   if (buttonState == HIGH) {  // Two equals (==) for comparison
     // ...
   }
   ```
   - Single `=` is assignment, double `==` is comparison

3. **Missing delay()**
   - Debouncing delay is important
   - Add `delay(20);` in the loop

## Advanced Troubleshooting

### Problem: Intermittent failures
**Debug with Serial Monitor:**

```cpp
void setup() {
  Serial.begin(9600);
  pinMode(BUTTON_PIN, INPUT);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);
  Serial.println(buttonState);  // Print 0 or 1
  delay(100);
}
```

Open Serial Monitor (Tools → Serial Monitor) to see readings as you press/release button.

### Expected output:
- Releases: stream of `0`s
- Pressing: brief transition period, then stream of `1`s
- Releasing: brief transition period, back to `0`s

If you don't see transitions, there's a connection issue.

## Success Checklist

✓ Button press turns LED on
✓ Button release turns LED off
✓ No flickering or jitter
✓ Response is immediate (<100ms)
✓ Holding button keeps LED on
✓ Works consistently multiple times

## Quick Fix Flowchart

1. Is LED connected? → Test with Lesson 1 blink code
2. Is button connected to Pin 2? → Verify with Serial Monitor output
3. Is 10kΩ resistor connected to GND? → Measure with multimeter
4. Is debouncing delay in place? → Check `delay(20);` line
5. Still broken? → Try a different button; pin might be damaged

Good luck! 🔌
