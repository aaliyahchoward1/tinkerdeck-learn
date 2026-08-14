# Lesson 1: Blink - Your First Arduino Program

## Introduction

Welcome! In this lesson, you'll create your first Arduino program. We'll make an LED blink on and off using simple code. This might seem small, but it's the foundation for controlling anything connected to your Arduino.

## What You'll Learn

- The basic structure of an Arduino sketch (program)
- How to control digital pins
- How to use `digitalWrite()` to turn things on and off
- How to add delays to control timing

## Concepts

### The Arduino Sketch Structure

Every Arduino program has two essential functions:

```cpp
void setup() {
  // Runs once when the board powers up
}

void loop() {
  // Runs repeatedly, forever
}
```

### Digital Pins

Arduino Uno has 13 digital pins (numbered 0-13). Each pin can be set to:
- `HIGH` (5 volts - "on")
- `LOW` (0 volts - "off")

### `digitalWrite()`

This function sets a digital pin to HIGH or LOW:
```cpp
digitalWrite(pin, value);  // pin: 0-13, value: HIGH or LOW
```

## Step-by-Step Instructions

### Step 1: Gather Your Materials

You'll need:
- Arduino Uno microcontroller
- USB cable (to connect Arduino to computer)
- LED (light-emitting diode)
- 220Ω resistor (protects the LED)
- Breadboard (to connect components without soldering)
- Jumper wires (to make connections)

### Step 2: Wire the Circuit

See the wiring diagram for a visual guide. Here's what to do:

1. Insert the LED into the breadboard
   - Longer leg (positive) goes to digital pin 13 (via the resistor)
   - Shorter leg (negative) goes to GND (ground)

2. Insert the 220Ω resistor
   - One end connects to the LED's long leg
   - Other end connects to digital pin 13

3. Connect jumper wires
   - From pin 13 to one end of the resistor
   - From GND to the LED's short leg

### Step 3: Upload the Code

1. Open the Arduino IDE on your computer
2. Copy the code from `blink.ino`
3. Paste it into the IDE
4. Connect your Arduino via USB
5. Click "Upload" (right arrow button)
6. Watch your LED blink!

## The Code Explained

```cpp
const int LED_PIN = 13;  // Define which pin the LED is on

void setup() {
  // Set pin 13 as OUTPUT so we can control it
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  // Turn the LED ON
  digitalWrite(LED_PIN, HIGH);
  delay(1000);  // Wait 1 second (1000 milliseconds)
  
  // Turn the LED OFF
  digitalWrite(LED_PIN, LOW);
  delay(1000);  // Wait 1 second
}
```

**Line by line:**
- `const int LED_PIN = 13;` - Store the pin number in a variable
- `pinMode(LED_PIN, OUTPUT);` - Tell Arduino this pin is an output
- `digitalWrite(LED_PIN, HIGH);` - Turn the LED on
- `delay(1000);` - Wait for 1000 milliseconds (1 second)
- `digitalWrite(LED_PIN, LOW);` - Turn the LED off
- `delay(1000);` - Wait 1 second before the loop repeats

## Challenges

Try these modifications to learn more:

### Challenge 1: Change the Blink Speed
Modify the `delay()` values. What happens if you use 500? 100? 5000?

### Challenge 2: Different Pattern
Make the LED blink in a pattern:
- Short on, short off, short on, long off
- Long on, short off, short on, short off

### Challenge 3: Multiple LEDs
Connect more LEDs to different pins (like pin 12, 11, 10) and make them blink in sequence.

## Tips & Tricks

- The LED won't light if connected backwards - try flipping it
- If it still doesn't work, the resistor might be too high (try 470Ω)
- The small LED symbol shows which end is positive on the diagram
- `delay(1000)` means 1 second; use half for faster blinks

## What's Next?

Once you've got this working, you're ready for:
- **Lesson 2**: Button Input - making the Arduino respond to buttons
- **Lesson 3**: Sensors - reading analog values from the real world
- **Lesson 4**: Mini Display - showing information on an LCD screen

## Key Takeaways

✓ Arduino programs have `setup()` (runs once) and `loop()` (runs forever)
✓ `pinMode()` configures pins as inputs or outputs
✓ `digitalWrite()` turns pins HIGH (on) or LOW (off)
✓ `delay()` pauses the program in milliseconds
✓ Every LED needs a resistor to protect it

Congratulations on your first Arduino program! 🎉
