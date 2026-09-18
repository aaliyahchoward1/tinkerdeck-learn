# Lesson 2: Button Input - Making Your Arduino Interactive

## Introduction

In Lesson 1, we made an LED blink on its own. But that's boring! Now we'll make your Arduino respond to the real world by reading a button. When you press the button, the LED will do something. This is the foundation for interactive projects.

## What You'll Learn

- How to read a digital input from a button
- How to use `if` statements to make decisions
- How to wire a pull-down resistor
- Why button debouncing matters
- How to create simple interaction logic

## Concepts

### Digital Input

Just like we can set pins to HIGH or LOW, we can also *read* the state of a pin:
```cpp
int state = digitalRead(pin);  // Returns HIGH (1) or LOW (0)
```

### `pinMode()` for Input

To read from a pin, we configure it as an INPUT:
```cpp
pinMode(pin, INPUT);  // This pin is now an input
```

### Pull-Down Resistors

When a button is **not pressed**, the pin can "float" between HIGH and LOW, causing unstable readings. A 10kΩ pull-down resistor keeps the pin at LOW when the button is open:

```
Button (normally open)
    |
    o---[10kΩ resistor]---GND
    |
   PIN
```

When the button closes, it connects PIN directly to +5V (HIGH).

### Conditional Logic

The `if` statement lets your Arduino make decisions:

```cpp
if (buttonState == HIGH) {
  // Button is pressed
  digitalWrite(LED_PIN, HIGH);
} else {
  // Button is not pressed
  digitalWrite(LED_PIN, LOW);
}
```

### Debouncing

Buttons are "bouncy" — they don't instantly settle to HIGH or LOW. They vibrate for a few milliseconds. This causes false readings. The solution is to add a small delay after reading:

```cpp
delay(20);  // Wait for bouncing to settle
```

## Step-by-Step Instructions

### Step 1: Gather Your Materials

You'll need everything from Lesson 1, plus:
- Push button (momentary switch)
- 10kΩ resistor (for pull-down)

### Step 2: Wire the Circuit

See the wiring diagram for details. Here's the concept:

1. **Button connection:**
   - One leg to +5V (through the button)
   - Other leg to PIN 2 and to GND (through 10kΩ resistor)

2. **LED connection:**
   - Same as Lesson 1 (LED on pin 13)

When you press the button:
- PIN 2 connects to +5V → digitalRead() returns HIGH
- When released, the 10kΩ resistor pulls it to LOW

### Step 3: Upload the Code

1. Open Arduino IDE
2. Copy code from `button-control.ino`
3. Connect Arduino via USB
4. Click Upload
5. Press the button and watch the LED respond!

## The Code Explained

```cpp
const int BUTTON_PIN = 2;
const int LED_PIN = 13;

void setup() {
  pinMode(BUTTON_PIN, INPUT);   // Button is an input
  pinMode(LED_PIN, OUTPUT);      // LED is an output
}

void loop() {
  // Read the button state
  int buttonState = digitalRead(BUTTON_PIN);
  
  // If button is pressed (HIGH), turn LED on
  if (buttonState == HIGH) {
    digitalWrite(LED_PIN, HIGH);
  } else {
    // Otherwise turn LED off
    digitalWrite(LED_PIN, LOW);
  }
  
  // Small delay for debouncing
  delay(20);
}
```

**Line by line:**
- `digitalRead(BUTTON_PIN)` — Read if button is pressed (returns HIGH or LOW)
- `if (buttonState == HIGH)` — Check if the value equals HIGH
- `digitalWrite(LED_PIN, HIGH)` — Turn LED on
- `else` — If condition is false, do this instead
- `delay(20)` — Wait 20ms for button contacts to settle

## Challenges

Try these to learn more:

### Challenge 1: Toggle the LED
Make the LED turn ON when you press, and stay ON until you press again (toggle behavior):
```cpp
if (buttonState == HIGH && previousState == LOW) {
  ledState = !ledState;  // Flip between HIGH and LOW
}
previousState = buttonState;
```

### Challenge 2: Multiple Buttons
Add a second button to control a different LED. Duplicate the code for the second button!

### Challenge 3: Button-Controlled Blink
Instead of constant on/off, make the LED blink when the button is pressed:
```cpp
if (buttonState == HIGH) {
  digitalWrite(LED_PIN, HIGH);
  delay(500);
  digitalWrite(LED_PIN, LOW);
  delay(500);
}
```

### Challenge 4: Debounce Improvement
Add debouncing to detect a "press" more reliably by requiring multiple consistent readings

## Tips & Tricks

- **No press detected?** Check that the pull-down resistor (10kΩ) is connected to GND
- **LED always on?** The button logic might be inverted — try reversing HIGH/LOW
- **Jittery behavior?** Increase the delay() to 50ms for more stable reading
- **Multiple buttons?** Use different pins (3, 4, 5, etc.) for each
- **Pressed vs Released?** Add another variable to track the previous state and detect changes

## What's Next?

You now understand how to:
- Read input from the physical world
- Make decisions based on that input
- Create interactive behavior

Next up:
- **Lesson 3**: Analog sensors to read continuously varying values
- **Lesson 4**: Displaying information on an LCD screen
- **Projects**: Build interactive devices with buttons and sensors

## Key Takeaways

✓ `digitalRead()` reads a pin as HIGH (1) or LOW (0)
✓ `pinMode(pin, INPUT)` configures a pin to read
✓ Pull-down resistors keep floating pins stable
✓ `if/else` statements make decisions based on input
✓ Debouncing (delay) prevents false readings from button bouncing
✓ Buttons are the gateway to interactive projects

Great job! You've made your Arduino interactive! 🎮
