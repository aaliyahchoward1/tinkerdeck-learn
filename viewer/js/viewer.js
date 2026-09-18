// TinkerDeck Learn - 3D Circuit Viewer
// Phase 2: Interactive drag-and-drop component placement

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1f2e);
scene.fog = new THREE.Fog(0x1a1f2e, 100, 500);

const canvas = document.getElementById('canvas');
const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
camera.position.set(30, 25, 30);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowShadowMap;

// Orbit controls
const controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.minDistance = 20;
controls.maxDistance = 100;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(50, 50, 50);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
scene.add(directionalLight);

// Grid
const gridHelper = new THREE.GridHelper(60, 60, 0x2d3748, 0x1a202c);
gridHelper.position.y = -0.5;
scene.add(gridHelper);

// Drag and drop system
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let draggingObject = null;
let draggingPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let draggingOffset = new THREE.Vector3();
const dragPoint = new THREE.Vector3();

// Disable orbit controls while dragging
canvas.addEventListener('mousedown', (event) => {
    // Only drag with left mouse button
    if (event.button !== 0) return;

    // Calculate mouse position in normalized device coordinates
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Cast ray and find intersected objects
    raycaster.setFromCamera(mouse, camera);

    // Only check draggable objects (components, not breadboard/arduino base)
    if (currentScene) {
        const allObjects = [];
        currentScene.traverse((obj) => {
            if (obj.userData.draggable) {
                allObjects.push(obj);
            }
        });

        const intersects = raycaster.intersectObjects(allObjects, true);
        if (intersects.length > 0) {
            // Find the top-level draggable group
            let obj = intersects[0].object;
            while (obj.parent && !obj.userData.draggable) {
                obj = obj.parent;
            }

            if (obj.userData.draggable) {
                draggingObject = obj;
                controls.enableRotate = false;

                // Calculate offset from drag point to object center
                raycaster.ray.intersectPlane(draggingPlane, dragPoint);
                draggingOffset.copy(draggingObject.position).sub(dragPoint);

                // Visual feedback
                draggingObject.userData.originalScale = draggingObject.scale.clone();
                draggingObject.scale.multiplyScalar(1.1);
            }
        }
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (!draggingObject) return;

    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(draggingPlane, dragPoint);

    // Snap to grid (0.5 unit increments on XZ plane, keep Y fixed at 2)
    const snapped = new THREE.Vector3(
        Math.round(dragPoint.x * 2) / 2,
        draggingObject.position.y,
        Math.round(dragPoint.z * 2) / 2
    ).add(draggingOffset);

    draggingObject.position.copy(snapped);
});

canvas.addEventListener('mouseup', () => {
    if (draggingObject) {
        controls.enableRotate = true;

        // Restore scale
        if (draggingObject.userData.originalScale) {
            draggingObject.scale.copy(draggingObject.userData.originalScale);
        }

        draggingObject = null;
    }
});

let currentLesson = 1;
let currentScene = null;

// Component models (simple geometries for now)
function createArduino() {
    const group = new THREE.Group();

    // Main board (blue PCB)
    const board = new THREE.Mesh(
        new THREE.BoxGeometry(7, 0.3, 5.4),
        new THREE.MeshStandardMaterial({ color: 0x1a5a96 })
    );
    board.castShadow = true;
    board.receiveShadow = true;
    group.add(board);

    // Pin headers (small cylinders)
    const pinMaterial = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.8 });
    for (let i = 0; i < 14; i++) {
        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.5), pinMaterial);
        pin.position.x = -3 + (i * 0.5);
        pin.position.y = 0.25;
        pin.castShadow = true;
        group.add(pin);
    }

    group.position.y = 1;
    return group;
}

function createBreadboard() {
    const group = new THREE.Group();

    // Main body (beige)
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(17, 0.8, 6.5),
        new THREE.MeshStandardMaterial({ color: 0xf5deb3 })
    );
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Hole grid indication (subtle texture)
    const holeMaterial = new THREE.MeshStandardMaterial({
        color: 0xd4c5a0,
        roughness: 0.8
    });
    const holes = new THREE.Mesh(new THREE.BoxGeometry(16.5, 0.81, 6), holeMaterial);
    holes.position.z = 0.01;
    holes.castShadow = true;
    group.add(holes);

    return group;
}

function createLED(color = 0xff0000) {
    const group = new THREE.Group();
    group.userData.draggable = true;

    // LED bulb (dome)
    const bulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 16, 16),
        new THREE.MeshStandardMaterial({
            color,
            emissive: color,
            emissiveIntensity: 0.3,
            metalness: 0.3,
            roughness: 0.4
        })
    );
    bulb.position.y = 0.4;
    bulb.castShadow = true;
    group.add(bulb);

    // Leads (long wires)
    const leadMaterial = new THREE.MeshStandardMaterial({ color: 0x8b7500 });
    const lead1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3), leadMaterial);
    lead1.position.y = -1;
    lead1.castShadow = true;
    group.add(lead1);

    const lead2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3), leadMaterial);
    lead2.position.x = 0.3;
    lead2.position.y = -1;
    lead2.castShadow = true;
    group.add(lead2);

    return group;
}

function createResistor() {
    const group = new THREE.Group();
    group.userData.draggable = true;

    // Body (beige cylinder)
    const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 1.2),
        new THREE.MeshStandardMaterial({ color: 0xe8c4a0 })
    );
    body.rotation.z = Math.PI / 2;
    body.castShadow = true;
    group.add(body);

    // Color bands
    const bandMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    for (let i = 0; i < 3; i++) {
        const band = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.08), bandMaterial);
        band.rotation.z = Math.PI / 2;
        band.position.x = -0.3 + i * 0.3;
        group.add(band);
    }

    // Leads
    const leadMaterial = new THREE.MeshStandardMaterial({ color: 0xc0c0c0 });
    const lead1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.6), leadMaterial);
    lead1.rotation.z = Math.PI / 2;
    lead1.position.x = -0.8;
    lead1.castShadow = true;
    group.add(lead1);

    const lead2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.6), leadMaterial);
    lead2.rotation.z = Math.PI / 2;
    lead2.position.x = 0.8;
    lead2.castShadow = true;
    group.add(lead2);

    return group;
}

function createButton() {
    const group = new THREE.Group();
    group.userData.draggable = true;

    // Main button (black square)
    const button = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.6, 1.2),
        new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
    );
    button.position.y = 0.5;
    button.castShadow = true;
    group.add(button);

    // Top button (raised)
    const top = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.2, 0.8),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
    );
    top.position.y = 0.7;
    top.castShadow = true;
    group.add(top);

    // Leads
    const leadMaterial = new THREE.MeshStandardMaterial({ color: 0xc0c0c0 });
    const positions = [[-0.4, -0.2, -0.4], [0.4, -0.2, -0.4], [-0.4, -0.2, 0.4], [0.4, -0.2, 0.4]];
    positions.forEach(pos => {
        const lead = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.8), leadMaterial);
        lead.position.set(...pos);
        lead.position.y -= 0.4;
        lead.castShadow = true;
        group.add(lead);
    });

    return group;
}

// Lesson data
const lessons = {
    1: {
        title: "Lesson 1: Blink",
        components: [
            { name: "Arduino Uno", pins: "Pin 13" },
            { name: "220Ω Resistor", pins: "Current limiting" },
            { name: "Red LED", pins: "Pin 13 → GND" },
            { name: "Breadboard", pins: "830 holes" }
        ],
        connections: [
            "Arduino Pin 13 → 220Ω resistor",
            "Resistor → LED+ (long leg)",
            "LED- (short leg) → GND"
        ],
        scene: createLesson1Scene
    },
    2: {
        title: "Lesson 2: Button Input",
        components: [
            { name: "Arduino Uno", pins: "Pin 2, 13" },
            { name: "Tactile Button", pins: "Pin 2" },
            { name: "10kΩ Resistor", pins: "Pull-down" },
            { name: "Red LED", pins: "Pin 13" },
            { name: "220Ω Resistor", pins: "Current limiting" }
        ],
        connections: [
            "Button leg → Pin 2",
            "Button leg → +5V",
            "10kΩ resistor → GND (pull-down)",
            "LED+, resistor, GND circuit"
        ],
        scene: createLesson2Scene
    },
    3: {
        title: "Lesson 3: Sensor",
        components: [
            { name: "Arduino Uno", pins: "A0, Pin 5" },
            { name: "Analog Sensor", pins: "A0" },
            { name: "LED + PWM", pins: "Pin 5" }
        ],
        connections: [
            "Sensor → Pin A0 (analog)",
            "LED PWM → Pin 5"
        ],
        scene: createLesson3Scene
    },
    4: {
        title: "Lesson 4: LCD Display",
        components: [
            { name: "Arduino Uno", pins: "A4, A5" },
            { name: "16x2 LCD", pins: "I2C (0x27)" },
            { name: "I2C Module", pins: "SDA/SCL" }
        ],
        connections: [
            "LCD GND → Arduino GND",
            "LCD VCC → Arduino +5V",
            "LCD SDA → Arduino A4",
            "LCD SCL → Arduino A5"
        ],
        scene: createLesson4Scene
    }
};

// Scene builders
function createLesson1Scene() {
    const group = new THREE.Group();

    const arduino = createArduino();
    arduino.position.set(-8, 0, 0);
    group.add(arduino);

    const breadboard = createBreadboard();
    breadboard.position.set(8, 0, 0);
    group.add(breadboard);

    const led = createLED(0xff0000);
    led.position.set(8, 2, -2);
    group.add(led);

    const resistor = createResistor();
    resistor.position.set(8, 2, 2);
    group.add(resistor);

    return group;
}

function createLesson2Scene() {
    const group = new THREE.Group();

    const arduino = createArduino();
    arduino.position.set(-8, 0, 0);
    group.add(arduino);

    const breadboard = createBreadboard();
    breadboard.position.set(8, 0, 0);
    group.add(breadboard);

    const led = createLED(0xff0000);
    led.position.set(6, 2, 2);
    group.add(led);

    const resistor = createResistor();
    resistor.position.set(8, 2, 2);
    group.add(resistor);

    const button = createButton();
    button.position.set(10, 1, -2);
    group.add(button);

    const pullDown = createResistor();
    pullDown.position.set(8, 2, -2);
    group.add(pullDown);

    return group;
}

function createLesson3Scene() {
    const group = new THREE.Group();

    const arduino = createArduino();
    arduino.position.set(-8, 0, 0);
    group.add(arduino);

    const breadboard = createBreadboard();
    breadboard.position.set(8, 0, 0);
    group.add(breadboard);

    const led = createLED(0xff6600);
    led.position.set(8, 2, 2);
    group.add(led);

    // Sensor representation
    const sensor = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0x9933ff })
    );
    sensor.position.set(4, 2, -2);
    sensor.castShadow = true;
    group.add(sensor);

    return group;
}

function createLesson4Scene() {
    const group = new THREE.Group();

    const arduino = createArduino();
    arduino.position.set(-10, 0, 0);
    group.add(arduino);

    const breadboard = createBreadboard();
    breadboard.position.set(8, 0, 0);
    group.add(breadboard);

    // LCD display (rectangle)
    const lcdBody = new THREE.Mesh(
        new THREE.BoxGeometry(8, 0.5, 5),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
    );
    lcdBody.position.set(0, 3, 0);
    lcdBody.castShadow = true;
    group.add(lcdBody);

    // LCD screen (dark display area)
    const screen = new THREE.Mesh(
        new THREE.BoxGeometry(7, 0.2, 4),
        new THREE.MeshStandardMaterial({ color: 0x001a00, emissiveIntensity: 0.1 })
    );
    screen.position.set(0, 3.2, 0);
    group.add(screen);

    return group;
}

function loadLesson(lessonNum) {
    currentLesson = lessonNum;
    const lesson = lessons[lessonNum];

    // Update sidebar
    document.getElementById('lesson-title').textContent = lesson.title;

    // Update components list
    const componentList = document.getElementById('component-list');
    componentList.innerHTML = lesson.components
        .map(c => `<li><strong>${c.name}</strong><br>${c.pins}</li>`)
        .join('');

    // Update connections list
    const connectionList = document.getElementById('connection-list');
    connectionList.innerHTML = lesson.connections
        .map(c => `<li>${c}</li>`)
        .join('');

    // Update scene
    if (currentScene) {
        scene.remove(currentScene);
    }
    currentScene = lesson.scene();
    scene.add(currentScene);

    // Update button states
    document.querySelectorAll('.lesson-nav button').forEach((btn, idx) => {
        btn.classList.toggle('active', idx + 1 === lessonNum);
    });

    // Reset camera view
    controls.reset();
    camera.position.set(30, 25, 30);
    camera.lookAt(0, 0, 0);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

// Initialize
loadLesson(1);
animate();
