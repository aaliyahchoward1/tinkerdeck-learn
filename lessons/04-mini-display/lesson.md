# Lesson 4: Mini Display - Showing Data on an LCD Screen

## Introduction

So far, we've controlled LEDs and read sensors. But how do we show meaningful information? This lesson introduces LCD displays and the I2C protocol—a way to communicate with more complex components using just two wires.

By the end, you'll be displaying text, numbers, and sensor readings on a small LCD screen!

## What You'll Learn

- What I2C (Inter-Integrated Circuit) communication is
- How to wire and initialize an LCD display
- How to use the LiquidCrystal_I2C library
- How to display text and numbers
- How to update a display in real-time
- How to position text on the screen

## Concepts

### I2C Communication

I2C is a protocol that lets the Arduino communicate with multiple devices using just 2 wires:
- **SDA** (Serial Data) - Pin A4 on Arduino Uno
- **SCL** (Serial Clock) - Pin A5 on Arduino Uno

Think of it like a two-way conversation where the Arduino is the "master" and devices are "slaves."

Benefits:
- Uses only 2 pins (saves pins!)
- Can connect many devices to the same 2 pins
- Each device has a unique address (like a house address)

### LCD Display

A 16x2 LCD means:
- 16 characters wide
- 2 rows of text
- Common with an I2C module (makes wiring simple)

### Libraries

Arduino libraries add pre-built functionality. For this lesson:

```cpp
#include <LiquidCrystal_I2C.h>

// Create LCD object (address, columns, rows)
LiquidCrystal_I2C lcd(0x27, 16, 2);
```

The address `0x27` is standard for most I2C LCD modules.

### Display Functions

```cpp
lcd.init();              // Initialize display
lcd.backlight();         // Turn on backlight
lcd.setCursor(0, 0);     // Set position (column, row)
lcd.print("Hello");      // Print text
lcd.clear();             // Clear all text
```

## Step-by-Step Instructions

### Step 1: Install the Library

1. Open Arduino IDE
2. Go to Sketch → Include Library → Manage Libraries
3. Search for "LiquidCrystal I2C" (by Frank de Brabander)
4. Click Install
5. Close the Library Manager

### Step 2: Gather Materials

- Arduino Uno
- 16x2 LCD with I2C module attached
- Jumper wires (4 minimum)
- Optional: sensor (temperature, light, distance)

### Step 3: Wire the Display

I2C LCD has 4 pins:
- **GND** → Arduino GND
- **VCC** → Arduino +5V
- **SDA** → Arduino A4
- **SCL** → Arduino A5

See wiring diagram for details.

### Step 4: Find the Display Address

Most displays use address `0x27`, but some use `0x3F`. If the display doesn't work, try the other address.

Upload the I2C Scanner code from the code directory to find it.

### Step 5: Upload the Main Code

Copy `lcd-display.ino` to Arduino IDE, upload, and watch your LCD light up!

### Step 6: Experiment

- Modify the text displayed
- Add sensor readings to the display
- Update the display based on button presses

## The Code Explained

### Simple Display Example

```cpp
#include <LiquidCrystal_I2C.h>

// Create LCD object (address, width, height)
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  // Initialize the LCD
  lcd.init();
  
  // Turn on backlight
  lcd.backlight();
  
  // Set cursor to column 0, row 0
  lcd.setCursor(0, 0);
  
  // Print text on row 0
  lcd.print("Hello, World!");
  
  // Set cursor to column 0, row 1
  lcd.setCursor(0, 1);
  
  // Print text on row 1
  lcd.print("Arduino!");
}

void loop() {
  // Nothing to do - display stays as is
}
```

**Key functions:**
- `lcd.init()` — Wake up the display
- `lcd.backlight()` — Turn on the backlight LED
- `lcd.setCursor(col, row)` — Position where text goes
- `lcd.print()` — Display text or numbers
- `lcd.clear()` — Erase everything

### Displaying Changing Data

```cpp
void loop() {
  int sensorValue = analogRead(A0);
  int brightness = map(sensorValue, 0, 1023, 0, 255);
  
  // Clear previous text
  lcd.clear();
  
  // Display sensor value
  lcd.setCursor(0, 0);
  lcd.print("Sensor: ");
  lcd.print(sensorValue);
  
  // Display mapped value
  lcd.setCursor(0, 1);
  lcd.print("Bright: ");
  lcd.print(brightness);
  
  delay(500);  // Update twice per second
}
```

### Formatting Text

```cpp
// Right-align a number
lcd.setCursor(10, 0);
lcd.print(value);  // Value appears at column 10

// Show both text and numbers
float temp = 23.5;
lcd.print("Temp: ");
lcd.print(temp);

// Control decimal places
lcd.print(temp, 1);  // Show 1 decimal place
```

## Challenges

### Challenge 1: Temperature Display
Connect a temperature sensor (DHT11 or LM35) and display the temperature in real-time:
```cpp
int tempC = readTemperature();
lcd.setCursor(0, 0);
lcd.print("Temp: ");
lcd.print(tempC);
lcd.print("C");
```

### Challenge 2: Animated Display
Create scrolling text:
```cpp
String message = "Welcome to Arduino!";
for (int i = 0; i <= 16 - message.length(); i++) {
  lcd.clear();
  lcd.setCursor(i, 0);
  lcd.print(message);
  delay(300);
}
```

### Challenge 3: Multi-Sensor Display
Read two sensors and show both values on separate rows

### Challenge 4: Button-Controlled Display
Use a button to switch between different display modes (sensor readings, time counter, custom messages)

## Tips & Tricks

- **Display not showing?** 
  - Check if I2C address is correct (try both 0x27 and 0x3F)
  - Ensure SDA (A4) and SCL (A5) are wired correctly
  - Try adjusting the contrast potentiometer on the I2C module

- **Garbled text?**
  - Address might be wrong
  - Try different addresses using I2C Scanner

- **Want to know the address?**
  - Use the I2C Scanner sketch (included in code directory)
  - It will print all I2C addresses it finds

- **Backlight too bright/dim?**
  - Adjust potentiometer on I2C module
  - Or use `lcd.noBacklight()` to turn it off

- **Need more space?**
  - 20x4 displays have 20 columns and 4 rows
  - Just change initialization: `LiquidCrystal_I2C lcd(0x27, 20, 4)`

## What's Next?

You now understand:
- I2C communication protocol
- How to use external libraries
- Displaying real-time data
- Positioning text precisely

Next projects:
- **Weather station** - display temperature, humidity
- **Data logger** - record and display min/max values
- **Menu system** - button-controlled screen selections
- **Alarm clock** - RTC (real-time clock) module + LCD
- **Game display** - simple games using LCD output

## Key Takeaways

✓ I2C uses 2 pins (SDA/SCL) to communicate with multiple devices
✓ LCD displays need initialization: `lcd.init()` and `lcd.backlight()`
✓ `lcd.setCursor(col, row)` positions the text
✓ Libraries provide pre-built functions for complex devices
✓ Always check I2C device address (use Scanner if unsure)
✓ Can update display in real-time by clearing and rewriting
✓ 16x2 displays have 16 columns × 2 rows of characters

You've graduated from simple LEDs to displaying data! 🎉
