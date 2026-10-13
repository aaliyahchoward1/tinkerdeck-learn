# TinkerDeck Learn - 3D Circuit Viewer

Interactive 3D visualization of all four lesson circuits, built with Three.js.

## Overview

This viewer turns each lesson's breadboard circuit into a **drag-and-drop puzzle**: components spawn off to the side in a staging row, and the student drags each one into its correct spot on the breadboard, with live feedback as they go.
- Rotate, zoom, and pan the circuit layout
- Drag components into place with real-time correct/incorrect feedback
- Get stuck? Toggle hints to see where each piece belongs
- Reset a lesson to try again, or share a direct link to it
- Switch between all 4 lessons instantly, on desktop or phone

## Features

### Current (v4.0 - Puzzle Mode)
- ✅ 3D geometry models for all components (Arduino, breadboard, LEDs, resistors, buttons, LCD)
- ✅ All 4 lesson scenes
- ✅ Orbit camera controls (rotate, zoom, pan)
- ✅ Auto-rotating view
- ✅ Component and connection sidebar
- ✅ Lesson navigation
- ✅ **Drag-and-drop component placement** (Phase 2)
- ✅ **Component position validation** - green when correct, red when incorrect (Phase 3)
- ✅ **Validation status UI** - shows real-time correctness count (Phase 3)
- ✅ **Wire visualization** - draws connections between correctly placed components (Phase 3)
- ✅ **Bounding box outlines** - visual feedback for validation state (Phase 3)
- ✅ **Scrambled starting layout** - components start in a staging row, not pre-solved (Phase 4)
- ✅ **Reset button** - restage all components to try the lesson again (Phase 4)
- ✅ **Hint toggle** - ghost outlines show where unsolved components belong (Phase 4)
- ✅ **Shareable lesson links** - `?lesson=N` loads directly into that lesson, with a one-click copy-link button (Phase 4)
- ✅ **Responsive mobile layout** - canvas stacks above a scrollable sidebar under 700px (Phase 4)

### Planned (v5.0 - Advanced)
- 🔲 Connection point snapping (snap to connection points when nearby)
- 🔲 Click component → highlight wiring path
- 🔲 Wire connections manually (teaching mode)
- 🔲 Export circuit diagrams
- 🔲 Real GLTF models from Sketchfab/Thingiverse
- 🔲 Animation (wire tracing, LED blinking)
- 🔲 Multi-angle breakdown views
- 🔲 AR integration

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
- **Left Mouse Drag on Component**: Drag component from the staging row to its spot (snaps to 0.5-unit grid)
- **Left Mouse Drag on Canvas**: Rotate view
- **Scroll**: Zoom in/out
- **Right Mouse Drag**: Pan the camera
- **Auto-rotate**: Enabled by default (disabled while dragging)
- **Lesson buttons**: Switch between 4 lessons
- **Reset**: Restage every component for the current lesson
- **Hints**: Toggle ghost outlines showing where unsolved pieces belong
- **Copy Link**: Copy a `?lesson=N` URL that opens directly into the current lesson
- **Validation Status**: Shows below the action buttons - displays correct/total components

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
| Arduino Uno | Box + cylinders | Blue PCB, USB port, power jack, two pin header rows |
| Breadboard | Box + instanced cylinders | Beige plastic, 560-hole instanced grid |
| LED | Sphere + cylinders | Colored bulb, two leads |
| Resistor | Cylinder + bands | Tan body, color bands |
| Button | Box | Black plastic, 4 leads |
| LCD 16x2 | Box | Dark display, I2C module |

## Performance

- **Size**: ~30KB (HTML + JS, no external models)
- **Load time**: <500ms on modern browsers
- **FPS**: 60 on desktop, 30-60 on mobile
- **Memory**: ~50MB (Three.js + scene geometry)

## Implementation Details

### Validation System (Phase 3)
- **Position Matching**: Each lesson defines expected component positions
- **Tolerance**: Components within 1 unit of expected position = correct
- **Visual Feedback**: 
  - Green wireframe outline = correct placement
  - Red wireframe outline = incorrect placement
- **Real-time Updates**: Validation runs after each drag operation

### Wire Visualization (Phase 3)
- Draws lines between correctly-placed components
- Color-coded per connection type (red, green, yellow, cyan, etc.)
- Only visible when both endpoints are correctly placed
- Updates in real-time as components are positioned

### Component Type System
- Each component tagged with `userData.componentType` (led, resistor, button, sensor, pulldown, lcd)
- Enables smart matching for validation and wire drawing
- Extensible for future component types

### Puzzle Mode (Phase 4)
- Each lesson's draggable components spawn in a staging row beside the breadboard, not at their solved position
- **Reset**: rebuilds the current lesson from scratch, which re-stages every component
- **Hints**: for each target position not yet occupied by a correctly-placed component, draws a translucent cyan wireframe ghost at that spot; hints update automatically after every drag
- **Shareable links**: the URL's `?lesson=N` is read on load and kept in sync via `history.replaceState` as lessons change, so the address bar and the Copy Link button always match the lesson on screen

## Future Enhancements

### Phase 5 (Connection Snapping)
- Snap to connection points when dragging nearby
- Show connection point indicators
- Force correct orientation/alignment

### Phase 6 (Advanced)
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
