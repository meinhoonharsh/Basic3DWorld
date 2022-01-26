import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

// Functional Approach

// Setting Up Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Setting Up Camera
const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 1.0;
const far = 1000.0;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(75, 20, 0);

// Setting Up Scene
const scene = new THREE.Scene();

//  Setting Up Lights
let light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(20, 100, 10);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.bias = -0.001;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 500.0;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500.0;
light.shadow.camera.left = 100;
light.shadow.camera.right = -100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;
scene.add(light);

//   Adding an Ambient Light
light = new THREE.AmbientLight(0x101010);
scene.add(light);

// Setting Up Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 20, 0);
controls.update();

// Setting Up Skybox
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  "./resources/skybox/1/posx.jpg",
  "./resources/skybox/1/negx.jpg",
  "./resources/skybox/1/posy.jpg",
  "./resources/skybox/1/negy.jpg",
  "./resources/skybox/1/posz.jpg",
  "./resources/skybox/1/negz.jpg",
  // './resources/test/skyrender0001.bmp',
  // './resources/test/skyrender0004.bmp',
  // './resources/test/skyrender0003.bmp',
  // './resources/test/skyrender0006.bmp',
  // './resources/test/skyrender0005.bmp',
  // './resources/test/skyrender0002.bmp',
]);
scene.background = texture;

// Setting Up Plane
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100, 10, 10),
  new THREE.MeshStandardMaterial({
    color: 0x585897,
  })
);
plane.castShadow = false;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Function to Generate Random Hex Code of THREE.Color
const randomHex = () => {

    const color= "#" + Math.floor(Math.random() * 16777215).toString(16);
    return color;
}

// Setting Up Boxes
for (let x = -8; x < 8; x++) {
  for (let y = -8; y < 8; y++) {
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshStandardMaterial({
        color: randomHex(),
      })
    );
    box.position.set(
      Math.random() + x * 5,
      Math.random() * 4.0 + 2.0,
      Math.random() + y * 5
    );
    box.castShadow = true;
    box.receiveShadow = true;
    scene.add(box);
  }
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const render = () => {
  requestAnimationFrame(render);
  // plane.rotation.x += 0.01;
  renderer.render(scene, camera);
};

render();
