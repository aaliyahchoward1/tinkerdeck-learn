# TinkerDeck Learn - 3D Circuit Viewer

Interactive 3D visualization of all four lesson circuits, built with Three.js.

## Overview

This viewer provides a **passive 3D view** of each lesson's breadboard circuit, allowing students to:
- Rotate, zoom, and pan the circuit layout
- See component placement and orientation
- Understand spatial relationships between parts
- Switch between all 4 lessons instantly

## Features

### Current (v1.0 - Passive)
- ✅ 3D geometry models for all components (Arduino, breadboard, LEDs, resistors, buttons, LCD)
- ✅ All 4 lesson scenes
- ✅ Orbit camera controls (rotate, zoom, pan)
- ✅ Auto-rotating view
- ✅ Component and connection sidebar
- ✅ Lesson navigation

### Planned (v2.0 - Interactive)
- 🔲 Drag components to arrange them
- 🔲 Click component → highlight wiring path
- 🔲 Validate correct connections
- 🔲 Wire connections manually (teaching mode)
- 🔲 Export circuit diagrams

## Usage

### Local Development
```bash
# No build step needed - just open in a browser
open viewer/index.html

# Or serve locally (recommended for best experience)
python3 -m http.server 8000
# Then visit http://localhost:8000/viewer/
```

### Controls
- **Left Mouse Drag**: Rotate view
- **Scroll**: Zoom in/out
- **Right Mouse Drag**: Pan the camera
- **Auto-rotate**: Enabled by default (click anywhere to pause)
- **Lesson buttons**: Switch between 4 lessons

## Project Structure

```
viewer/
├── index.html          # Main viewer page (HTML + CSS)
├── js/
│   └── viewer.js       # Three.js scene setup, models, logic
├── models/             # (Future) external GLTF/GLB models
└── scenes/             # (Future) pre-built scene configs
```

## Technology

- **Three.js**: 3D rendering (loaded from CDN)
- **OrbitControls**: Camera manipulation
- **Procedural geometry**: All models generated in JS (no external files needed)

## Component Models

Each component is built from basic Three.js geometries:

| Component | Geometry | Details |
|-----------|----------|---------|
| Arduino Uno | Box + cylinders | Blue PCB, silver pin headers |
| Breadboard | Box | Beige plastic, 830 holes |
| LED | Sphere + cylinders | Colored bulb, two leads |
| Resistor | Cylinder + bands | Tan body, color bands |
| Button | Box | Black plastic, 4 leads |
| LCD 16x2 | Box | Dark display, I2C module |

## Performance

- **Size**: ~30KB (HTML + JS, no external models)
- **Load time**: <500ms on modern browsers
- **FPS**: 60 on desktop, 30-60 on mobile
- **Memory**: ~50MB (Three.js + scene geometry)

## Future Enhancements

### Phase 2 (Interactive)
- Drag-and-drop component placement
- Click-to-highlight wiring
- Connection validation

### Phase 3 (Advanced)
- Real GLTF models from Sketchfab/Thingiverse
- Animation (wire tracing, LED blinking)
- Multi-angle breakdown views
- AR integration

## Debugging

**Viewer won't load?**
- Check console (F12 → Console tab)
- Ensure Three.js CDN is reachable
- Try different browser (Chrome, Firefox, Safari)

**Models look wrong?**
- Zoom out to see full scene
- Click auto-rotate button to reset view
- Try different lesson to verify framework works

**Performance sluggish?**
- Disable auto-rotate (click viewport)
- Lower browser rendering quality
- Try on a device with better GPU

## Contributing

To add or modify component models, edit `viewer/js/viewer.js`:
- Component creation functions: `createArduino()`, `createLED()`, etc.
- Scene builders: `createLesson1Scene()`, etc.
- Edit colors, dimensions, positions as needed

## License

Part of TinkerDeck Learn (see root LICENSE file).
