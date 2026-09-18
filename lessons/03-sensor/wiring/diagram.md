# Analog Sensor Circuit Wiring Diagram

Choose one: Potentiometer OR Photoresistor

## Option A: Potentiometer (Easier)

```
    Arduino Uno
    ┌─────────────────┐
    │ GND  A0  ··· 5 │
    │                 │
    └─────────────────┘
      │   │   │
      │   │   └──(PWM LED circuit)
      │   │
      │   └───[Potentiometer middle pin]
      │       (turn knob to adjust)
      │
    [Potentiometer pins:]
      ├─ +5V (power)
      ├─ A0 (middle, signal)
      └─ GND (ground)
```

### Potentiometer Wiring:
- Pin 1 (left) → +5V (power)
- Pin 2 (middle) → Arduino A0 (analog input)
- Pin 3 (right) → GND (ground)

Turn the knob to adjust sensor value from 0-1023.

## Option B: Photoresistor (Light Sensor)

```
    Arduino Uno
    ┌──────────────────┐
    │ GND  A0  ··· 5   │
    │                  │
    └──────────────────┘
      │    │   │
      │    │   └──(PWM LED circuit)
      │    │
      │    ├────(Photoresistor)───+5V
      │    │
      │    └────[10kΩ resistor]───GND
      │
      └───────────────────────────GND
```

### Photoresistor Wiring:
1. Connect +5V to one end of photoresistor
2. Connect other end of photoresistor to Arduino A0
3. Connect 10kΩ pull-down resistor from A0 to GND
4. This creates a voltage divider:
   - Bright light → low resistance → low voltage → read ~0
   - Dim/dark → high resistance → high voltage → read ~1023

Optionally: reverse the logic in code for intuitive "brighter = higher number"

## LED Circuit (Both Sensors)

```
    Arduino Pin 5 (PWM-capable)
           │
           ├─[220Ω resistor]─┐
           │                 │
                            [LED]
                             │
                            GND
```

### LED Wiring:
- Pin 5 through 220Ω resistor to LED+ (long leg)
- LED- (short leg) to GND

**Important:** Use Pin 5 (or 3, 6, 9, 10, 11) — these are PWM-capable. Pin 13 won't work for brightness control.

## Pin Connections Summary

| Component | Arduino Pin | Notes |
|-----------|------------|-------|
| **Potentiometer** | | |
| Power (left) | +5V | Provides power |
| Signal (middle) | A0 | Analog input |
| Ground (right) | GND | Ground return |
| **OR Photoresistor** | | |
| One end | +5V | Power |
| Other end | A0 | Through 10kΩ to GND |
| Pull-down R. | A0 to GND | Creates voltage divider |
| **LED** | | |
| LED+ (through R.) | Pin 5 | PWM for brightness |
| LED- | GND | Ground return |

## Understanding the Circuit

### Potentiometer Voltage Divider:
```
+5V
 │
[Resistor 1 (varies)]
 │
A0 ← Reads voltage here
 │
[Resistor 2 (varies)]
 │
GND
```

When you turn the knob, you change the ratio between R1 and R2, which changes the voltage at A0.

### Photoresistor Voltage Divider:
```
+5V
 │
[Photoresistor (varies with light)]
 │
A0 ← Reads voltage here
 │
[10kΩ pull-down (fixed)]
 │
GND
```

When light increases, photoresistor resistance decreases → voltage at A0 decreases → reading decreases.

## PWM Output

Pin 5 supports PWM (Pulse Width Modulation):
- `analogWrite(5, 0)` → 0% duty cycle → LED off
- `analogWrite(5, 127)` → 50% duty cycle → medium brightness
- `analogWrite(5, 255)` → 100% duty cycle → full brightness

The LED blinks very fast (~490 Hz), creating the illusion of dimming.

## Safety & Tips

⚠️ **Important**
- Use PWM-capable pins (3, 5, 6, 9, 10, 11) for `analogWrite()`
- Pin 13 doesn't support PWM - use it for digital only
- 10kΩ pull-down prevents floating input for photoresistor
- Potentiometer draws minimal current (safe with Arduino)
- Both sensor options produce 0-1023 range

## Calibration Hints

**For Potentiometer:**
- Should show full range: ~0 to ~1023
- If not, check power/ground connections

**For Photoresistor:**
- Dark: might read 900-1023
- Bright light: might read 100-300
- Adjust MIN/MAX_READING in code to your environment
- Use Serial Monitor to see actual values (Tools → Serial Monitor)
