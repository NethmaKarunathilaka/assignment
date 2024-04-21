// New scene featuring a rotating sphere with a texture applied

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a sphere geometry
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// Load texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('assets/textures/earth.jpg'); // Replace 'texture.jpg' with your texture file path
const sphereMaterial = new THREE.MeshPhongMaterial({ map: texture });

// Create a sphere mesh with the texture applied
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Add ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

// Position the camera
camera.position.z = 5;

// Define rotation speed
const sphereRotationSpeed = 0.02;

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);
    sphere.rotation.y += sphereRotationSpeed;
    renderer.render(scene, camera);
};

animate();
