const icons = [
    'typescript', 'javascript', 'dart', 'java', 'react', 'flutter', 'android',
    'html5', 'css3', 'nodedotjs', 'express', 'nextdotjs', 'prisma', 'amazonaws',
    'postgresql', 'firebase', 'nginx', 'vercel', 'testinglibrary', 'jest',
    'cypress', 'docker', 'git', 'jira', 'github', 'gitlab', 'visualstudiocode',
    'androidstudio', 'sonarqube', 'figma'
];

let scene, camera, renderer, globe;
let raycaster, mouse;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let tooltipElement;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Set scene background to white

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 500;

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('iconGlobe'), antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1); // Set renderer clear color to white

    globe = new THREE.Group();
    scene.add(globe);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    const loader = new THREE.TextureLoader();

    icons.forEach((icon, index) => {
        loader.load(`https://cdn.simpleicons.org/${icon}`, (texture) => {
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
            
            const phi = Math.acos(-1 + (2 * index) / icons.length);
            const theta = Math.sqrt(icons.length * Math.PI) * phi;

            sprite.position.setFromSphericalCoords(250, phi, theta);
            sprite.scale.multiplyScalar(20);
            sprite.userData.name = icon;
            
            globe.add(sprite);
        });
    });

    tooltipElement = document.getElementById('tooltip');

    document.addEventListener('mousedown', onDocumentMouseDown);
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
    document.addEventListener('wheel', onDocumentWheel);
    window.addEventListener('resize', onWindowResize);
}

function onDocumentMouseDown(event) {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

function onDocumentMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (isDragging) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        globe.rotation.y += deltaMove.x * 0.005;
        globe.rotation.x += deltaMove.y * 0.005;

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }

    updateTooltip();
}

function onDocumentMouseUp() {
    isDragging = false;
}

function onDocumentWheel(event) {
    camera.position.z += event.deltaY * 0.5;
    camera.position.z = Math.max(200, Math.min(800, camera.position.z));
}

function updateTooltip() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(globe.children);

    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        tooltipElement.textContent = intersectedObject.userData.name;
        tooltipElement.style.left = (event.clientX + 10) + 'px';
        tooltipElement.style.top = (event.clientY + 10) + 'px';
        tooltipElement.style.opacity = 1;
    } else {
        tooltipElement.style.opacity = 0;
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
        globe.rotation.y += 0.005; // Increased rotation speed
    }

    renderer.render(scene, camera);
}

init();
animate();


