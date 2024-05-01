
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load('assets/textures/milkyway.jpg');


scene.background = backgroundTexture;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const orbits = {
    mars: { radius: 2, speed: 0.02},
    earth: { radius: 5, speed: 0.015},
    venus: { radius: 9, speed: 0.01},
    mercury: { radius: 13, speed: 0.008},
    sun:{ radius: 19, speed: 0.0003}
  
};


let totalRadius = 0;
for (const planetName in orbits) {
    if (Object.hasOwnProperty.call(orbits, planetName)) {
        totalRadius += orbits[planetName].radius;
    }
}
const averageRadius = totalRadius / Object.keys(orbits).length;


const planetTextures = {
    mars: 'assets/textures/mars.jpg',
    venus: 'assets/textures/venus.jpg',
    earth: 'assets/textures/Earth_.jpg',
    mercury: 'assets/textures/mercury.jpg',
    sun:'assets/textures/sun.jpg'

};

const planetMeshes = {};

for (const planetName in orbits) {
    if (Object.hasOwnProperty.call(orbits, planetName)) {
        const { radius } = orbits[planetName];
        const planetGeometry = new THREE.SphereGeometry(radius*0.15, 32, 32);
        const planetTexture = new THREE.TextureLoader().load(planetTextures[planetName]);
        const planetMaterial = new THREE.MeshPhongMaterial({ map: planetTexture });
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        planet.position.x = radius - averageRadius; 
        scene.add(planet);
        planetMeshes[planetName] = planet;
    }
}


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambientLight);


camera.position.z = 10;


const animate = function () {
    requestAnimationFrame(animate);
   
    for (const planetName in planetMeshes) {
        if (Object.hasOwnProperty.call(planetMeshes, planetName)) {
            const planet = planetMeshes[planetName];
            planet.rotation.y += orbits[planetName].speed; 
        }
    }
    renderer.render(scene, camera);
};

animate();


