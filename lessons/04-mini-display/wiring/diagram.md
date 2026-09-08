# LCD Display with I2C Wiring Diagram

## Simple Diagram

```
    Arduino Uno
    ┌──────────────┐
    │ GND  A4 A5   │
    │              │
    └──────────────┘
      │   │   │
      │   │   │
      │   │   └─── SCL (Clock)
      │   └─────── SDA (Data)
      │
      └──────────────────────────┐
                                 │
                    I2C LCD Module
                    ┌──────────┐
                    │ GND VCC  │
                    │ SDA SCL  │
                    └──────────┘
                      │   │   │
                      │   │   └── +5V (power)
                      │   └────── SCL (Serial Clock)
                      └────────── SDA (Serial Data)
```

## Pin Connections

| LCD Module Pin | Arduino Pin | Purpose |
|---|---|---|
| GND | GND | Ground |
| VCC | +5V | Power |
| SDA | A4 | Serial Data (I2C) |
| SCL | A5 | Serial Clock (I2C) |

**That's it! Only 4 wires needed for the LCD.**

## Step-by-Step Wiring

### Step 1: Power Connections
- LCD **GND** → Arduino **GND**
- LCD **VCC** → Arduino **+5V**

### Step 2: I2C Data Lines
- LCD **SDA** → Arduino **A4** (Serial Data)
- LCD **SCL** → Arduino **A5** (Serial Clock)

### Step 3: Verify
- All 4 wires connected
- No loose connections
- Check I2C address (usually 0x27, sometimes 0x3F)

## I2C Protocol

I2C stands for **Inter-Integrated Circuit**. It's a two-wire communication protocol:

- **SDA** (Serial Data Line) - carries the actual data
- **SCL** (Serial Clock Line) - synchronizes the communication

The Arduino acts as the "master" and the LCD acts as a "slave" that responds to commands.

### Advantages of I2C:
- Only 2 data pins needed (saves lots of Arduino pins)
- Can connect multiple I2C devices to the same 2 pins
- Each device has a unique address (like a house number)
- Relatively fast communication

## Finding Your LCD Address

Most I2C LCDs use address `0x27`, but some use `0x3F` or other addresses.

**To find your display's address:**
1. Upload `i2c_scanner.ino` from the code directory
2. Open Serial Monitor (9600 baud)
3. It will print all I2C addresses that respond
4. Update your code with the correct address:

```cpp
LiquidCrystal_I2C lcd(0x27, 16, 2);  // Change 0x27 if needed
```

## Common I2C Addresses

| Address | Common Display |
|---------|---|
| 0x27 | Most common (default) |
| 0x3F | Alternative common address |
| 0x20-0x26 | Other I2C modules |

## Optional: Display Contrast

Some I2C LCD modules have a potentiometer for adjusting contrast:
- Located on the I2C module (small blue component)
- Turn it with a small screwdriver if display is too dim/bright
- Adjust until text appears clearly

## Optional: Temperature Sensor (Challenge 1)

If adding a DHT11 temperature sensor:

```
DHT11 Sensor:
- Pin 1 (VCC) → Arduino +5V
- Pin 2 (DATA) → Arduino Pin 8
- Pin 4 (GND) → Arduino GND
(Pin 3 is not used)
```

Then use `lcd-sensor.ino` and adapt for temperature data.

## Troubleshooting

**Display doesn't light up?**
- Check power (GND and VCC)
- Verify I2C address with scanner
- Adjust backlight potentiometer

**No text displayed?**
- Check I2C address with scanner
- Verify SDA (A4) and SCL (A5) connections
- Try different address (0x27 vs 0x3F)

**Garbled text?**
- Wrong I2C address
- Use i2c_scanner.ino to find correct address

## Component Images Reference

- **LCD Module**: Small rectangle with 4 pins on back
- **I2C Module**: Small blue board attached to LCD back
- **Potentiometer**: Small adjustable component on I2C module
- **Arduino A4/A5**: Located on analog input row
