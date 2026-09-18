# Lesson 3: Analog Sensors - Reading the Real World

## Introduction

Up until now, we've worked with digital signals: ON/OFF, HIGH/LOW. But the real world is analog—continuously varying. Light, temperature, sound, and distance aren't just on or off—they're varying in degrees.

In this lesson, we'll read analog values from a sensor and use them to control an LED's brightness. This is your gateway to real-world sensing!

## What You'll Learn

- How analog signals differ from digital
- How to read analog input using `analogRead()`
- What PWM (Pulse Width Modulation) is
- How to control brightness with `analogWrite()`
- How to calibrate and map sensor values
- How to filter sensor noise

## Concepts

### Digital vs Analog

**Digital:** Only two states—HIGH (1) or LOW (0)
- Buttons are digital (pressed or not)
- Pins 0-13 are digital I/O

**Analog:** Continuously varying values (0 to 5 volts)
- Light sensors produce varying voltage based on brightness
- Potentiometers produce varying voltage based on knob position
- Arduino has 6 analog input pins (A0-A5)

### Analog Input: analogRead()

Arduino has an analog-to-digital converter (ADC) that reads voltages:

```cpp
int value = analogRead(A0);  // Returns 0-1023
```

- 0V → 0
- 5V → 1023
- The value represents the voltage level

### PWM: Pulse Width Modulation

Digital pins can only be HIGH or LOW, but we can fake analog output by rapidly switching:

```cpp
analogWrite(pin, value);  // value: 0-255
```

- 0 = 0% ON (always off) → dim
- 127 = 50% ON (blink really fast) → medium
- 255 = 100% ON (always on) → bright

To our eyes, fast blinking looks like varying brightness!

### The map() Function

Often we need to convert one range to another:

```cpp
int brightness = map(sensorValue, 0, 1023, 0, 255);
```

This converts:
- Input range: 0-1023 (analogRead output)
- Output range: 0-255 (analogWrite input)

### Sensor Noise

Real sensors are noisy—readings fluctuate slightly even when the input doesn't change. Solutions:
1. Take multiple readings and average them
2. Ignore small changes
3. Use a smoothing filter

## Step-by-Step Instructions

### Step 1: Choose Your Sensor

**Option A: Light Sensor (Photoresistor)**
- Resistance changes with light
- Needs a 10kΩ pull-down resistor
- More interesting for experiments

**Option B: Potentiometer**
- Turn the knob to vary voltage
- Simpler to wire
- Good for learning the basics

### Step 2: Gather Materials

- Arduino Uno
- Sensor (photoresistor OR potentiometer)
- LED (5mm)
- 220Ω resistor (for LED)
- 10kΩ resistor (for photoresistor, if using)
- Breadboard and jumper wires

### Step 3: Wire the Circuit

See wiring diagram for details.

**For Potentiometer:**
- Pin 1 → +5V
- Pin 2 → Arduino A0
- Pin 3 → GND

**For Photoresistor:**
- +5V → Photoresistor → Arduino A0
- Arduino A0 → 10kΩ resistor → GND
- LED on Pin 5 (PWM-capable pin)

### Step 4: Upload the Code

Copy from `analog-sensor.ino` and upload.

### Step 5: Experiment

- Adjust sensor (turn potentiometer or cover light sensor)
- Watch LED brightness change
- Open Serial Monitor to see sensor values

## The Code Explained

```cpp
const int SENSOR_PIN = A0;
const int LED_PIN = 5;

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
  // Note: analog pins are inputs by default
}

void loop() {
  // Read sensor value (0-1023)
  int sensorValue = analogRead(SENSOR_PIN);
  
  // Convert to brightness value (0-255)
  int brightness = map(sensorValue, 0, 1023, 0, 255);
  
  // Control LED brightness
  analogWrite(LED_PIN, brightness);
  
  // Print for monitoring
  Serial.println(sensorValue);
  
  delay(50);  // Reduce noise by averaging over time
}
```

**Key functions:**
- `analogRead(A0)` — Read the sensor (returns 0-1023)
- `map(value, 0, 1023, 0, 255)` — Scale to brightness range
- `analogWrite(5, brightness)` — Set LED brightness (0-255)
- `Serial.println()` — Show values in Serial Monitor

## Calibration

Real sensors need calibration. Your light sensor might read 200-800, not 0-1023. To fix:

```cpp
// Calibration values (adjust these)
const int MIN_READING = 200;
const int MAX_READING = 800;

int brightness = map(sensorValue, MIN_READING, MAX_READING, 0, 255);
brightness = constrain(brightness, 0, 255);  // Keep in range
```

Use Serial Monitor to find your sensor's actual range, then update the code.

## Challenges

### Challenge 1: Inverted Response
Make the LED brighter when it's darker:
```cpp
int brightness = map(sensorValue, 0, 1023, 255, 0);  // Reversed range
```

### Challenge 2: Noise Filtering
Take 10 readings and average them:
```cpp
int sum = 0;
for (int i = 0; i < 10; i++) {
  sum += analogRead(SENSOR_PIN);
  delay(10);
}
int sensorValue = sum / 10;
```

### Challenge 3: Threshold Detection
Turn LED on only if sensor exceeds a threshold:
```cpp
if (sensorValue > 500) {
  digitalWrite(LED_PIN, HIGH);
} else {
  digitalWrite(LED_PIN, LOW);
}
```

### Challenge 4: Multiple Sensors
Read two sensors on A0 and A1, control two LEDs independently

## Tips & Tricks

- **PWM pins:** Only certain pins support `analogWrite()` — pins 3, 5, 6, 9, 10, 11 on Uno
- **Serial Monitor:** Tools → Serial Monitor (115200 baud) to see values
- **Noise:** If readings jitter, increase delay or use filtering
- **Calibration:** Always find your sensor's actual min/max values
- **Sensor selection:** Photoresistors are fun; potentiometers are easier to debug

## What's Next?

You now understand:
- Reading analog sensors
- Converting between different ranges
- PWM output for analog control
- Calibration and noise filtering

Next:
- **Lesson 4**: Display sensor values on an LCD screen
- **Projects**: Temperature monitor, light meter, automated lights
- **Advanced**: Multiple sensors, sensor fusion, real-time feedback

## Key Takeaways

✓ `analogRead()` returns values 0-1023 for voltages 0-5V
✓ `analogWrite()` uses PWM to simulate analog output (0-255)
✓ PWM works by rapid on/off switching (looks like dimming to human eyes)
✓ `map()` converts between different ranges
✓ Real sensors need calibration to work accurately
✓ Averaging multiple readings reduces noise
✓ Only certain pins (3, 5, 6, 9, 10, 11) support `analogWrite()` on Uno

Congratulations! You're now bridging the gap between digital and analog! 🌡️
