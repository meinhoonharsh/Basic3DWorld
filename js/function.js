import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
import CharacterController from './Controllers/CharacterController.js';

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
light.position.set(20, 40, 20);
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
light = new THREE.AmbientLight(0xf0f0f0);
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
]);
scene.background = texture;



let mixers = [];
let previousRaf = null;

var characterControls;

const LoadAnimatedModel = () => {
  const params = {
    camera: camera,
    scene: scene,
  }
  characterControls = new CharacterController(params);

  const PLOTloader = new FBXLoader();
  PLOTloader.setPath("./resources/models/plots/");
  PLOTloader.load("city4.fbx", (fbx) => {
    fbx.traverse(function (child) {
      child.castShadow = true;
      child.receiveShadow = true;
    });
    fbx.scale.setScalar(0.2);
    scene.add(fbx);
  });
  


};

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
const Step = (timeElapsed) => {
  const timeElapsedS = timeElapsed * 0.001;
  if (mixers.length > 0) {
    mixers.forEach((mixer) => mixer.update(timeElapsedS));
  }
  if (characterControls) {
    characterControls.Update(timeElapsedS);
  }
};
const render = () => {
  requestAnimationFrame((t) => {
    if (previousRaf === null) {
      previousRaf = t;
    }
    render();

    renderer.render(scene, camera);
    Step(t - previousRaf);
    previousRaf = t;
  });
  // plane.rotation.x += 0.01;
};
LoadAnimatedModel();
render();
