import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Чёрный фон

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 10;
camera.position.z = 5;
const minZ = -3000;
const maxZ = 20;

window.addEventListener('wheel', (event) => {
  event.preventDefault();

  if (event.deltaY < 0) {
    camera.position.z -= 5;
  } else {
    camera.position.z += 5;
  }

  camera.position.z = Math.max(minZ, Math.min(maxZ, camera.position.z));
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 30);
scene.add(directionalLight);

const sphereGeometry1 = new THREE.SphereGeometry(2.5, 32, 32); // Радиус = 2.5
const sphereGeometry2 = new THREE.SphereGeometry(5, 32, 32); // Радиус = 5
const sphereMaterials = [
  new THREE.MeshLambertMaterial({ color: 0xff5555 }),
  new THREE.MeshLambertMaterial({ color: 0x55ff55 }),
  new THREE.MeshLambertMaterial({ color: 0x5555ff })
];

for (let i = 0; i < 300; i++) {
  const geometry = i % 2 === 0 ? sphereGeometry1 : sphereGeometry2;
  const material = sphereMaterials[Math.floor(Math.random() * sphereMaterials.length)];

  const sphereLeft = new THREE.Mesh(geometry, material);
  sphereLeft.position.set(-20, geometry.parameters.radius, -i * 10);
  scene.add(sphereLeft);

  const sphereRight = new THREE.Mesh(geometry, material);
  sphereRight.position.set(20, geometry.parameters.radius, -i * 10);
  scene.add(sphereRight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
