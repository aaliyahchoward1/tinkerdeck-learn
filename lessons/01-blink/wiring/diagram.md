# LED Blink Circuit Wiring Diagram

## Text Diagram

```
    Arduino Uno
    ┌─────────────┐
    │             │
    │ GND  ···  13│───┬────┐
    │             │   │    │
    └─────────────┘   │    │
                      │    │
                     [R]  [LED]
                     220Ω   │
                      │    │
                      ├────┤
                      │    │
                   (Ground) │
                            │
                         Breadboard
```

## Pin Connections

| Component | Arduino Pin | Notes |
|-----------|------------|-------|
| LED+ (long leg) | Through 220Ω resistor → Pin 13 | Red or any color |
| LED- (short leg) | GND (Ground) | Shorter leg |
| Resistor end 1 | Pin 13 | From resistor to pin 13 |
| Resistor end 2 | LED long leg | Protects LED from overcurrent |

## Step-by-Step Wiring

1. **Prepare the LED**
   - Identify the longer leg (positive/anode)
   - Identify the shorter leg (negative/cathode)

2. **Place on Breadboard**
   - Insert LED into two adjacent holes
   - Push it down securely

3. **Connect the Resistor**
   - One end to LED's long leg
   - Other end to breadboard row with Pin 13 connection

4. **Connect to Arduino**
   - Jumper wire from Arduino Pin 13 to resistor
   - Jumper wire from Arduino GND to LED's short leg

5. **Double-Check**
   - LED long leg → resistor → pin 13 ✓
   - LED short leg → GND ✓
   - All connections secure ✓

## Safety Notes

⚠️ **Important**
- Never connect LED directly to pin without resistor
- The 220Ω resistor protects the LED and Arduino
- If LED doesn't light, check polarity (try flipping it)
- If resistor is too high (>1kΩ), LED might be too dim

## Component Images Reference

- **LED**: Small bulb shape, longer leg is positive
- **220Ω Resistor**: Brown-Red-Brown color bands
- **Breadboard**: Plastic board with many small holes connected in rows
- **Jumper Wires**: Single strand wires, usually pre-bent
