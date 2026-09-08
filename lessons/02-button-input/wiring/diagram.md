# Button Input Circuit Wiring Diagram

## Text Diagram

```
    Arduino Uno
    ┌─────────────┐
    │ GND  2  ··· 13│
    │             │
    └─────────────┘
      │    │        │
      │    │        ├─────[220Ω]──┐
      │    │        │              │
      │    │       [LED]           │
      │    │        │              │
      │    │        │             (+5V)
      │    │        └──────────────┘
      │    │
      │    ├──[10kΩ]──┐
      │    │          │
      │    └──(Button)┤
      │               │
      └───────────────┴─────────────(+5V)
```

## Pin Connections

| Component | Arduino Pin | Notes |
|-----------|------------|-------|
| Button (one leg) | Pin 2 | Through pull-down resistor to GND |
| Button (other leg) | +5V (power) | Supplies power when pressed |
| Pull-down resistor | Pin 2 to GND | Keeps pin LOW when button open |
| LED+ (long leg) | Pin 13 (through 220Ω) | Via current-limiting resistor |
| LED- (short leg) | GND | Ground connection |

## Step-by-Step Wiring

### Part 1: Set up the Button (Pull-down configuration)

1. **Place button on breadboard**
   - Insert button across the middle gap
   - Two legs on opposite sides

2. **Connect pull-down resistor**
   - One end from button leg to GND (through 10kΩ resistor)
   - Other end of button leg to Arduino Pin 2
   - This creates: Pin 2 → Button leg → +5V when pressed
   - And: Pin 2 → 10kΩ resistor → GND when released

3. **Verify connections:**
   - Button one leg: connects to Pin 2
   - Button other leg: connects to +5V
   - 10kΩ resistor: from Pin 2 side to GND

### Part 2: Set up the LED (Same as Lesson 1)

1. Insert LED into breadboard
2. Connect 220Ω resistor from LED+ to Pin 13
3. Connect jumper wire from LED- to GND

## How It Works

**When you press the button:**
- Button connects Pin 2 to +5V
- `digitalRead(BUTTON_PIN)` returns `HIGH` (1)
- LED turns ON

**When you release the button:**
- 10kΩ pull-down resistor pulls Pin 2 to GND
- `digitalRead(BUTTON_PIN)` returns `LOW` (0)
- LED turns OFF

## Why the Pull-Down Resistor?

Without the pull-down resistor:
- Pin 2 "floats" (undefined state) when button is open
- This causes unpredictable behavior
- The 10kΩ resistor fixes this by ensuring a known LOW state

A pull-down (or pull-up) resistor is needed whenever a digital input pin could otherwise be left floating — as with this external button wiring.

## Alternative: Pull-Up Configuration

Arduino also supports internal pull-up resistors:
```cpp
pinMode(BUTTON_PIN, INPUT_PULLUP);
```
This requires only the button (no external resistor), but inverts the logic (pressed = LOW).

## Safety Notes

⚠️ **Important**
- Button connections should not carry high current (they're safe at logic levels)
- The 10kΩ pull-down resistor protects the Arduino from floating pins
- LED must still have its 220Ω resistor to avoid burnout

## Component Images Reference

- **Push Button**: Small square switch, 4 legs in corners
- **10kΩ Resistor**: Brown-Black-Orange color bands
- **220Ω Resistor**: Brown-Red-Brown color bands
- Other components same as Lesson 1
