// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create sun
const sunGeometry = new THREE.SphereGeometry(2, 32, 32); // Sun is larger for visualization
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Yellow color for sun
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Define orbits for planets
const orbits = {
    mercury: { radius: 5, speed: 0.02 },
    venus: { radius: 8, speed: 0.015 },
    earth: { radius: 11, speed: 0.01 },
    mars: { radius: 14, speed: 0.008 },
    // Add more planets as needed
};

// Create planets
const planetTextures = {
    mercury: 'assets/textures/particle.jpg',
    venus: 'assets/textures/particle.jpg',
    earth: 'assets/textures/particle.jpg',
    mars: 'assets/textures/particle.jpg',
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
        planet.position.x = orbits[planetName].radius;
        scene.add(planet);
        planetMeshes[planetName] = planet;
    }
}

// Add ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

// Position the camera
camera.position.z = 20;

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);
    // Rotate planets around the sun
    for (const planetName in orbits) {
        if (Object.hasOwnProperty.call(orbits, planetName)) {
            const { radius, speed } = orbits[planetName];
            const planet = planetMeshes[planetName];
            planet.position.x = Math.cos(speed) * radius;
            planet.position.z = Math.sin(speed) * radius;
            speed += 0.01; // Increase rotation speed for next frame
        }
    }
    renderer.render(scene, camera);
};

animate();




