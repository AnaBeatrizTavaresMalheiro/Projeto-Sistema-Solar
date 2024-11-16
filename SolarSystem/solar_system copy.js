import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// Scene, camera, renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// CSS2DRenderer for labels
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0';
document.body.appendChild(labelRenderer.domElement);

const textureLoader = new THREE.TextureLoader();
textureLoader.load("texturas/fundo.jpg", function(texture) {
  scene.background = texture; // Define o fundo com a imagem carregada
});


// Function to create planets
function createPlanets(nome, raio, hsegmentos, vsegmentos, cor, position,textura,cor_fonte) {
  const sphereGeometry = new THREE.SphereGeometry(raio, hsegmentos, vsegmentos);
  const sphereMaterial = new THREE.MeshBasicMaterial({map: textureLoader.load(textura)});
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.position.set(...position);
  sphereMesh.userData = { distance: position[0] }; // Store the distance for later use
  scene.add(sphereMesh);

  // Create a label
  const label = new CSS2DObject(createLabelElement(nome,cor_fonte));
  label.position.set(0, -raio - 0.1, 0); // Offset label below the sphere
  sphereMesh.userData.label = label; // Store label in userData for easy access
  scene.add(label);

  return sphereMesh;
}

// Function to create label element
function createLabelElement(name,cor_fonte) {
  const div = document.createElement('div');
  div.className = 'label';
  div.textContent = name;
  div.style.fontSize = '0.8em';
  div.style.color = cor_fonte;
  div.style.pointerEvents = 'none'; // Make label ignore mouse events
  return div;
}

// Create the Sun
const sun = createPlanets('Sol', 1, 32, 32, 0xffff00, [0, 5, 0],'texturas/sol.jpg','black'); // Sun

// Create multiple planets with new sizes
const planets = [
  createPlanets('Mercúrio', 0.1, 32, 32, 0x7f7f7f, [3, 0, 0],'texturas/mercurio.jpg','white'), // Mercury
  createPlanets('Vênus', 0.2, 32, 32, 0xffff00, [5, 0, 0],'texturas/venus.jpg','white'), // Venus
  createPlanets('Terra', 0.2, 32, 32, 0x0077ff, [7, 0, 0],'texturas/terra.jpg','white'), // Earth
  createPlanets('Marte', 0.15, 32, 32, 0xff0000, [9, 0, 0],'texturas/marte.jpg','white'), // Mars
  createPlanets('Júpiter', 0.5, 32, 32, 0xffa500, [11, 0, 0],'texturas/jupiter.jpg','white'), // Jupiter
  createPlanets('Saturno', 0.45, 32, 32, 0xffd700, [13, 0, 0],'texturas/saturno.jpg','white'), // Saturn
  createPlanets('Urano', 0.35, 32, 32, 0xadd8e6, [15, 0, 0],'texturas/urano.jpg','white'), // Uranus
  createPlanets('Netuno', 0.35, 32, 32, 0x0000ff, [17, 0, 0],'texturas/netuno.jpg','white'), // Neptune
];

// Define angular velocities for planets
const velocidade_angular = [
  0.03,  // Mercury - mais rápido, pois está mais próximo do Sol
  0.02,  // Venus
  0.015,  // Earth
  0.010, // Mars
  0.008, // Jupiter
  0.006, // Saturn
  0.004, // Uranus
  0.002  // Neptune - mais lento, pois está mais distante
];


// Array to store individual angles for each planet
const angles = [1, 2, 4, 6, 8, 10, 12, 14];

// Set the camera position to see planets from above
camera.position.set(0, 20, 0);
camera.lookAt(0, 0, 0);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  planets.forEach((planet, index) => {
    const distance = planet.userData.distance;
    angles[index] += velocidade_angular[index];
    planet.position.x = distance * Math.cos(angles[index]);
    planet.position.z = distance * Math.sin(angles[index]);

    // Update label position to match planet's position
    const label = planet.userData.label;
    label.position.set(planet.position.x, planet.position.y - planet.geometry.parameters.radius - 0.7, planet.position.z);

    planet.rotation.y += 0.01; // Optional: Rotate the planet itself
  });


  renderer.render(scene, camera);
  labelRenderer.render(scene, camera); // Render labels
}

animate();
