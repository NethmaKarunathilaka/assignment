// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define orbits for planets
const orbits = {
    mercury: { radius: 2, speed: 0.02 },
    venus: { radius: 4, speed: 0.015 },
    earth: { radius: 6, speed: 0.01 },
    mars: { radius: 8, speed: 0.008 },
    // Add more planets as needed
};

// Create planets
const planetTextures = {
    mercury: 'assets/textures/earth.jpg',
    venus: 'assets/textures/earth.jpg',
    earth: 'assets/textures/earth.jpg',
    mars: 'assets/textures/earth.jpg',
    // Add more textures for additional planets
};

const planetMeshes = {};

for (const planetName in orbits) {
    if (Object.hasOwnProperty.call(orbits, planetName)) {
        const { radius } = orbits[planetName];
        const planetGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const planetTexture = new THREE.TextureLoader().load(planetTextures[planetName]);
        const planetMaterial = new THREE.MeshPhongMaterial({ map: planetTexture });
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        planet.position.x = orbits[planetName].radius; // Position planets to the left of the scene
        scene.add(planet);
        planetMeshes[planetName] = planet;
    }
}

// Add ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

// Position the camera
camera.position.z = 10;

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);
    // Rotate planets around their own axis
    for (const planetName in planetMeshes) {
        if (Object.hasOwnProperty.call(planetMeshes, planetName)) {
            const planet = planetMeshes[planetName];
            planet.rotation.y += orbits[planetName].speed; // Rotate around y-axis
        }
    }
    renderer.render(scene, camera);
};

animate();


