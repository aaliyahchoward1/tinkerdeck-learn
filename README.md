# TinkerDeck Learn

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Lessons](https://img.shields.io/badge/lessons-4-brightgreen.svg)]()
[![Arduino](https://img.shields.io/badge/platform-Arduino%20Uno-blue.svg)]()
[![Status](https://img.shields.io/badge/status-v1.0.0-success.svg)](CHANGELOG.md)
[![Beginner Friendly](https://img.shields.io/badge/difficulty-Beginner-green.svg)]()
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue.svg)](#)
[![Maintenance](https://img.shields.io/badge/maintained%3F-yes-green.svg)]()
[![Made with ❤️](https://img.shields.io/badge/made%20with-%E2%9D%A4%EF%B8%8F-red.svg)]()

An open-source Arduino learning platform with hands-on lessons for beginners.

An open-source Arduino learning platform with hands-on lessons for beginners. Start with the fundamentals and progress to building real interactive projects.

## 🎯 What is This?

TinkerDeck Learn provides structured, hands-on Arduino lessons designed for:
- **Complete beginners** — no electronics or programming experience needed
- **Visual learners** — wiring diagrams, code annotations, and ASCII schematics
- **Self-paced learners** — work through lessons at your own speed
- **Hands-on makers** — build real circuits and see immediate results

Each lesson includes:
- 📖 Clear explanation of concepts with theory
- 💻 Ready-to-use, tested Arduino code
- 🔌 Detailed wiring diagrams (text + visual)
- 📋 Complete bill of materials with costs
- 🔧 Comprehensive troubleshooting guides (10+ solutions each)
- 🎮 Challenge projects to extend learning
- 📊 Real-world applications and next steps

## 🚀 Quick Start (5 Minutes to Blinking LED)

### Prerequisites
- Arduino Uno microcontroller
- USB cable (Type A to Type B)
- 1 LED + 220Ω resistor + breadboard + jumper wires

### Get Started Now
```bash
1. Open lessons/01-blink/lesson.md
2. Follow the wiring diagram in lessons/01-blink/wiring/diagram.md
3. Copy code from lessons/01-blink/code/blink.ino to Arduino IDE
4. Upload and watch your LED blink!
```

**Time to first success:** ~15 minutes

## 🎨 3D Circuit Viewer

See your circuits come to life in **interactive 3D**!

We've built a 3D visualization tool that shows each lesson's circuit layout from every angle. Perfect for:
- Visual learners who want to see component placement
- Understanding spatial relationships before wiring
- Seeing how everything fits on the breadboard
- Reviewing circuits without hardware

### [👉 Open 3D Viewer (All 4 Lessons)](viewer/)

**Features:**
- Rotate, zoom, pan each circuit
- Switch instantly between lessons
- Component information sidebar
- Auto-rotating overview mode
- Works in any modern browser (no installation needed)

Coming soon: Interactive mode where you'll drag components and validate connections!

## 📚 Lesson Path & Progression

### Learning Flow

```
START (No experience)
  ↓
[01] Blink (15 min)
  └─ Basic digital output, LEDs, delays
  ↓
[02] Button Input (20 min)
  └─ Digital input, conditional logic, debouncing
  ↓
[03] Sensor Reading (30 min)
  └─ Analog input, PWM brightness, calibration
  ↓
[04] Mini Display (35 min)
  └─ I2C communication, LCD display, real-time data
  ↓
Ready for Projects!
```

### Beginner Lessons (Completed)

| Lesson | Topic | Time | Skills | Code Examples | Difficulty |
|--------|-------|------|--------|----------------|-----------|
| **[01 - Blink](lessons/01-blink/)** | LED blinking | 15 min | Digital output, timing | blink.ino | ⭐ |
| **[02 - Button Input](lessons/02-button-input/)** | Button interaction | 20 min | Digital input, logic, debouncing | button-control.ino | ⭐ |
| **[03 - Sensor Reading](lessons/03-sensor/)** | Analog sensors | 30 min | Analog I/O, PWM, calibration | analog-sensor.ino | ⭐⭐ |
| **[04 - Mini Display](lessons/04-mini-display/)** | LCD display | 35 min | I2C protocol, display control | 3 sketches included | ⭐⭐ |

### Intermediate (Coming Soon)
- Temperature monitoring
- Motion detection
- Home automation basics
- Multi-sensor data logging

### Advanced (Coming Soon)
- Wireless communication (WiFi, Bluetooth)
- IoT integration
- Real-time data visualization
- Custom shield design

## 📋 Prerequisites & Setup

### Before You Start

**No programming experience needed!** — These lessons assume zero prior knowledge.

**No electronics experience?** — Perfect! We cover everything from LED polarity to I2C protocols.

### What You'll Need

#### Hardware (One-Time Cost: ~$30-50)
- **Arduino Uno** microcontroller board (~$20)
- **USB cable** Type A to Type B (~$3)
- **Breadboard** (solderless, 400-hole) (~$3)
- **Jumper wires** assortment (~$3)
- **Component bundle** containing:
  - LEDs (5mm, assorted colors)
  - Resistors (220Ω, 1kΩ, 10kΩ)
  - Push buttons (momentary switches)
  - Sensors (photoresistor, potentiometer, optional temperature sensor)
  - 16x2 LCD with I2C module (~$5-10)

**Option:** Buy a starter kit from Arduino, SparkFun, or Adafruit (~$50) — includes everything needed for all 4 lessons.

#### Software (Free!)
1. **Arduino IDE** — Download from https://www.arduino.cc/en/software (Windows, macOS, Linux)
2. **LiquidCrystal_I2C Library** — Install via Arduino IDE (Sketch → Include Library → Manage Libraries)
3. **Optional:** Terminal/Bash for running validation scripts

### Installation Steps

1. **Install Arduino IDE**
   - Download from https://www.arduino.cc/en/software
   - Install and launch

2. **Connect Arduino**
   - Plug USB cable into Arduino Uno
   - Plug USB into computer
   - Windows users may need to install CH340 driver (automatic on macOS/Linux)

3. **Verify Setup**
   - Open Arduino IDE
   - Go to Tools → Board → Select "Arduino Uno"
   - Go to Tools → Port → Select your Arduino's port
   - Open File → Examples → Basics → Blink
   - Click Upload — your board's built-in LED should blink
   - Success! ✅

4. **Install Libraries** (for Lesson 4)
   - Sketch → Include Library → Manage Libraries
   - Search "LiquidCrystal I2C"
   - Install by Frank de Brabander

### Estimated Time
- Setup: 10-15 minutes
- Each lesson: 15-45 minutes
- Total to complete all 4: ~2-3 hours

## 📁 Project Structure

```
tinkerdeck-learn/
├── README.md                          # You are here!
├── LICENSE                            # MIT License
├── CONTRIBUTING.md                    # How to contribute
├── LESSON_TEMPLATE.md                 # Guide for creating lessons
│
├── lessons/                           # All lesson content
│   ├── 01-blink/
│   │   ├── lesson.yaml               # Metadata (difficulty, time, objectives)
│   │   ├── lesson.md                 # Full lesson tutorial
│   │   ├── code/
│   │   │   └── blink.ino             # Ready-to-upload Arduino sketch
│   │   ├── wiring/
│   │   │   ├── diagram.md            # ASCII wiring diagram & instructions
│   │   │   └── parts.json            # Bill of materials
│   │   └── troubleshooting.md        # 10+ solutions to common problems
│   │
│   ├── 02-button-input/              # Same structure for each lesson
│   ├── 03-sensor/
│   └── 04-mini-display/
│
├── scripts/
│   └── check-lessons.py              # Validates lesson structure
│
├── .github/
│   └── workflows/
│       └── validate.yml              # CI/CD pipeline (GitHub Actions)
│
└── models/                           # 3D component models (future)
    ├── arduino-uno.glb
    ├── breadboard.glb
    └── components/
```

### How to Navigate

**For Learners:**
```
1. Pick a lesson number (01, 02, 03, or 04)
2. Go to: lessons/[number]-[name]/
3. Read: lesson.md (main tutorial)
4. Setup: Follow wiring/diagram.md
5. Code: Copy code/ files to Arduino IDE
6. Debug: Check troubleshooting.md if issues
```

**For Contributors:**
```
1. Read: LESSON_TEMPLATE.md (detailed structure guide)
2. Create: New lesson directory following the template
3. Validate: Run scripts/check-lessons.py
4. Submit: Pull request with your lesson
```

## 🎓 Skills You'll Learn

### By the End of All 4 Lessons

**Programming Concepts:**
- ✅ Program structure (setup/loop)
- ✅ Variables and data types
- ✅ Functions (digitalWrite, digitalRead, analogRead, analogWrite)
- ✅ Conditional logic (if/else)
- ✅ Loops and timing
- ✅ String manipulation and Serial output

**Electronics Fundamentals:**
- ✅ LED circuits and current limiting
- ✅ Digital vs. analog signals
- ✅ Breadboard usage
- ✅ Wiring safety and best practices
- ✅ Component identification and datasheets
- ✅ Circuit debugging techniques

**Communication Protocols:**
- ✅ I2C (Two-wire) communication basics
- ✅ How devices talk to Arduino
- ✅ Library usage and configuration

**Practical Skills:**
- ✅ Reading and following wiring diagrams
- ✅ Uploading code to Arduino
- ✅ Using Serial Monitor for debugging
- ✅ Sensor calibration and noise filtering
- ✅ Problem-solving and troubleshooting

### Next Steps After These Lessons
- Build a weather station
- Create a motion-activated alarm
- Make a plant watering monitor
- Build a temperature data logger
- Design IoT projects with WiFi/Bluetooth

## 📖 How to Use This Repository

### For Learners
**Start with Lesson 01:**
1. Open [`lessons/01-blink/lesson.md`](lessons/01-blink/lesson.md)
2. Gather parts from [`lessons/01-blink/wiring/parts.json`](lessons/01-blink/wiring/parts.json)
3. Follow circuit diagram at [`lessons/01-blink/wiring/diagram.md`](lessons/01-blink/wiring/diagram.md)
4. Copy code from [`lessons/01-blink/code/blink.ino`](lessons/01-blink/code/blink.ino)
5. Upload and test!
6. If issues: check [`lessons/01-blink/troubleshooting.md`](lessons/01-blink/troubleshooting.md)

**Then proceed through Lessons 02 → 03 → 04** in order (they build on each other).

### For Instructors/Contributors
- **Contributing:** See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on creating/improving lessons
- **Lesson Template:** See [LESSON_TEMPLATE.md](LESSON_TEMPLATE.md) for detailed structure and format
- **Validation:** Run `python scripts/check-lessons.py` to verify lesson structure
- **Report Issues:** Open a GitHub issue with the lesson number and problem

## 📊 Progress Tracking

Copy this and track your progress:

```
Learning Progress Checklist
═══════════════════════════════════════════════════════

Lesson 01: Blink
  ☐ Read lesson.md
  ☐ Gathered parts
  ☐ Built circuit
  ☐ Uploaded code
  ☐ LED blinks! ✨

Lesson 02: Button Input
  ☐ Read lesson.md
  ☐ Gathered parts
  ☐ Built circuit
  ☐ Uploaded code
  ☐ Button controls LED! ✨

Lesson 03: Sensor Reading
  ☐ Read lesson.md
  ☐ Chose sensor (potentiometer or photoresistor)
  ☐ Gathered parts
  ☐ Built circuit
  ☐ Uploaded code
  ☐ LED brightness changes! ✨

Lesson 04: Mini Display
  ☐ Read lesson.md
  ☐ Installed LiquidCrystal_I2C library
  ☐ Gathered parts
  ☐ Built circuit
  ☐ Found I2C address with scanner
  ☐ Uploaded code
  ☐ Display shows data! ✨

All Lessons Complete! 🎉
```

## 🤝 Contributing

We welcome contributions! Whether you:
- Create new lessons
- Improve explanations
- Add diagrams or examples
- Report bugs or typos
- Translate content

Check [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

## 🙏 Acknowledgments

Built for the Arduino community by educators and makers.

## 🔗 Resources

- [Arduino Official Site](https://www.arduino.cc/)
- [Arduino Playground](https://playground.arduino.cc/)
- [SparkFun Tutorials](https://learn.sparkfun.com/)
- [Arduino Reference](https://www.arduino.cc/reference/en/)

## ❓ Frequently Asked Questions

**Q: Do I need experience with electronics or programming?**
A: Not at all! These lessons start from zero. No background needed.

**Q: Which Arduino board should I use?**
A: **Arduino Uno** is recommended (all lessons tested on it). Mega and Nano work too with minor pin changes.

**Q: Can I use different components than shown?**
A: Mostly yes! Key constraints:
- LED: Any color works (polarity matters)
- Resistors: Use specified value ± 10% (e.g., 220Ω works with 180Ω-270Ω)
- Buttons: Any momentary switch works
- Sensors: Photoresistors and potentiometers are interchangeable in Lesson 3
- LCD: Must be I2C (parallel LCD requires different code)

**Q: Where can I buy the parts?**
A: Several options:
- **Starter Kits:** Arduino ($50), SparkFun ($30-80), Adafruit ($50+)
- **Individual:** Amazon, eBay, local electronics stores
- **Recommended:** Buy a kit — includes everything + extras for experimentation

**Q: How long does each lesson take?**
A: 
- Lesson 01: 15 minutes
- Lesson 02: 20 minutes
- Lesson 03: 30 minutes
- Lesson 04: 35 minutes
- **Total: ~2-3 hours** (including setup time)

**Q: Can I skip a lesson?**
A: Not recommended. Lessons build on each other:
- Lesson 2 assumes you know Lesson 1 concepts
- Lesson 3 uses code from Lesson 1 + 2
- Lesson 4 combines all previous skills
- **Do them in order!**

**Q: What if my circuit doesn't work?**
A: Every lesson has extensive troubleshooting guides:
1. Check the `troubleshooting.md` in your lesson directory
2. Use Serial Monitor to debug (shown in lessons)
3. Ask on Arduino forums or GitHub Issues

**Q: Can I modify the code?**
A: Yes! Experimentation is encouraged. Challenges in each lesson suggest modifications.

**Q: Do I need to solder anything?**
A: No! Breadboards are solderless. Just push wires in.

**Q: Can I use a Raspberry Pi instead?**
A: Different platform, different setup. These lessons are Arduino-specific.

**Q: Are these lessons free?**
A: Yes! MIT License — free to use, modify, and distribute.

**Q: How do I contribute or report bugs?**
A: See [CONTRIBUTING.md](CONTRIBUTING.md) for details. GitHub Issues welcome!

---

**Happy tinkering! 🔌💡**

Questions or feedback? Open an issue or reach out to the community!
