// List of icons to display on the globe
const icons = [
    'typescript', 'javascript', 'dart', 'react', 'flutter', 'android',
    'html5', 'css3', 'nodedotjs', 'express', 'nextdotjs', 'prisma',
    'postgresql', 'firebase', 'nginx', 'vercel', 'testinglibrary', 'jest',
    'cypress', 'docker', 'git', 'jira', 'github', 'gitlab',
    'androidstudio', 'sonarqube', 'figma',
    
    // New Icons
    'ruby',               // Ruby
    'rubygems',          // RubyGems           
    'kotlin',            // Kotlin
    'swift',             // Swift           
    'angular',           // Angular
    'laravel',           // Laravel
    'mongodb',           // MongoDB
    'sqlite',            // SQLite
    'redis',             // Redis
    'graphql',           // GraphQL
    'apache',            // Apache
    'linux',             // Linux            
    'terraform',         // Terraform
    'kubernetes',        // Kubernetes
    'jupyter',           // Jupyter Notebook
    'notion',            // Notion
    'sketch',            // Sketch
    'woocommerce',       // WooCommerce
    'shopify',           // Shopify
    'wordpress',         // WordPress
    'python',            // Python
    'django'             // Django
];

// Global variables for the 3D scene
let scene, camera, renderer, globe;
let raycaster, mouse;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let tooltipElement;

// Initialize the 3D scene
function init() {
    // Create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Set background color to white

    // Set up the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 500; // Position the camera

    // Create the WebGL renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('iconGlobe'), antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1); // Set renderer clear color to white
    renderer.setPixelRatio(window.devicePixelRatio); // Adjust pixel ratio for clarity

    // Create a group for the globe
    globe = new THREE.Group();
    scene.add(globe);

    // Add lighting for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white ambient light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1); // Bright point light
    pointLight.position.set(50, 50, 50); // Set light position
    scene.add(pointLight);

    // Initialize raycaster and mouse
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Load textures for the icons
    const loader = new THREE.TextureLoader();

    icons.forEach((icon, index) => {
        loader.load(`https://cdn.simpleicons.org/${icon}`, (texture) => {
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
            
            // Calculate spherical coordinates for positioning the icons on the globe
            const phi = Math.acos(-1 + (2 * index) / icons.length);
            const theta = Math.sqrt(icons.length * Math.PI) * phi;

            sprite.position.setFromSphericalCoords(250, phi, theta); // Position the sprite

            // Adjust scale based on screen width
            const spriteScaleFactor = window.innerWidth < 768 ? 40 : 25; // Scale for mobile
            sprite.scale.set(spriteScaleFactor, spriteScaleFactor, 1); // Set uniform scale
            
            sprite.userData.name = icon; // Store icon name in userData
            
            globe.add(sprite); // Add sprite to the globe
        });
    });

    tooltipElement = document.getElementById('tooltip'); // Tooltip for icon names

    // Event listeners for user interactions
    document.addEventListener('mousedown', onDocumentMouseDown);
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
    document.addEventListener('wheel', onDocumentWheel);
    window.addEventListener('resize', onWindowResize);
}

// Handle mouse down event for dragging
function onDocumentMouseDown(event) {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

// Handle mouse move event
function onDocumentMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // Normalize mouse X
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize mouse Y

    if (isDragging) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        // Update globe rotation based on mouse movement
        globe.rotation.y += deltaMove.x * 0.005;
        globe.rotation.x += deltaMove.y * 0.005;

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }

    updateTooltip(event); // Update tooltip position and content
}

// Handle mouse up event
function onDocumentMouseUp() {
    isDragging = false; // Stop dragging
}

// Handle mouse wheel event for zooming
function onDocumentWheel(event) {
    camera.position.z += event.deltaY * 0.5; // Adjust camera position based on scroll
    camera.position.z = Math.max(200, Math.min(800, camera.position.z)); // Clamp zoom levels
}

// Update tooltip based on intersected icons
function updateTooltip(event) {
    raycaster.setFromCamera(mouse, camera); // Set raycaster from mouse position
    const intersects = raycaster.intersectObjects(globe.children); // Check for intersections

    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object; // Get the intersected object
        tooltipElement.textContent = intersectedObject.userData.name; // Set tooltip content
        tooltipElement.style.left = (event.clientX + 10) + 'px'; // Position tooltip
        tooltipElement.style.top = (event.clientY + 10) + 'px';
        tooltipElement.style.opacity = 1; // Make tooltip visible
    } else {
        tooltipElement.style.opacity = 0; // Hide tooltip if no intersection
    }
}

// Handle window resize events
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight; // Update aspect ratio
    camera.updateProjectionMatrix(); // Update projection matrix
    renderer.setSize(window.innerWidth, window.innerHeight); // Resize renderer
    renderer.setPixelRatio(window.devicePixelRatio); // Adjust pixel ratio on resize
}

// Animation loop
function animate() {
    requestAnimationFrame(animate); // Request next animation frame

    // Rotate globe when not dragging
    if (!isDragging) {
        globe.rotation.y += 0.005; // Increased rotation speed
    }

    renderer.render(scene, camera); // Render the scene
}

// Initialize and start animation
init();
animate();
