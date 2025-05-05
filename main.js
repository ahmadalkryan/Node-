import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
camera.position.z = 4;
camera.position.y = 2;


const vertices = [
  { pos: [-1, -1, 0], color: [1, 0, 0] },
  { pos: [1, -1, 0], color: [0, 1, 0] },
  { pos: [0, 1, 0], color: [0, 0, 1] }
];

const positions = [];
const colors = [];
for (const vertex of vertices) {
  positions.push(...vertex.pos);
  colors.push(...vertex.color);
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(new Float32Array(positions), 3)
);
geometry.setAttribute(
  "color",
  new THREE.BufferAttribute(new Float32Array(colors), 3)
);

const material = new THREE.MeshBasicMaterial({ vertexColors: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// المكعب الأحمر
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);


const planeGeometry = new THREE.PlaneGeometry(5, 5);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);


const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 2;
scene.add(sphere);


const controls = new OrbitControls(camera, renderer.domElement);
controls.update();


function animate(time) {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  box.position.x = Math.sin(time * 0.001) * 2;
  box.scale.set(1.5, 1.5, 1.5);
  
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);