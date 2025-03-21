import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const material2 = new THREE.LineBasicMaterial({ color: 0xbfbfbf });
const material3 = new THREE.LineBasicMaterial({ color: 0x98eb7a });

let modelMesh; // Store the loaded model's mesh
let physicsBody; // Store the Cannon.js body
let modelLoaded = false; // Add a flag to track model loading

function modelLoader(modelName, materialName) {
    const modelPath = `model/${modelName}.gltf`; // Store the path

    loader.load(modelPath, function (gltf) {
        if (!gltf || !gltf.scene) { // Check if gltf and gltf.scene exist
            console.error("Error: Invalid GLTF data for model:", modelName, "at path:", modelPath);
            return; // Exit if there's an error
        }

        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                modelMesh = child;
                child.material = materialName;
                scene.add(child);

                const geometry = child.geometry;
                if (geometry && geometry.boundingBox) {
                    geometry.computeBoundingBox();
                    const max = geometry.boundingBox.max;
                    const min = geometry.boundingBox.min;
                    const x = (max.x - min.x) / 2;
                    const y = (max.y - min.y) / 2;
                    const z = (max.z - min.z) / 2;
                    const modelShape = new window.CANNON.Box(new window.CANNON.Vec3(x, y, z));

                    physicsBody = new window.CANNON.Body({ mass: 1, shape: modelShape });
                    physicsBody.position.set(0, 0, 0); // Start at the origin
                    physicsBody.linearDamping = 0;
                    physicsBody.angularDamping = 0;
                    world.addBody(physicsBody);

                    console.log("Model loaded and Cannon.js body created:", modelName, "at path:", modelPath);
                    modelLoaded = true; // Set the flag
                } else {
                    console.error("Error: Geometry or bounding box is invalid for model:", modelName, "at path:", modelPath);
                }
            }
        });
    }, undefined, function (error) {
        console.error("Error loading model:", modelName, "at path:", modelPath, error);
    });
};

modelLoader("model", material3);

const width = window.innerWidth, height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 1000);
let CX = camera.position.x = 3;
let CY = camera.position.y = 3;
let CZ = camera.position.z = 3;
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

// Cannon.js physics world (CREATE FIRST)
const world = new window.CANNON.World();
world.gravity.set(0, -9.82, 0);
world.broadphase = new window.CANNON.NaiveBroadphase();
world.solver.iterations = 10;
world.solver.tolerance = 0.001;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

document.addEventListener("keydown", function (event) {
    event.preventDefault();
    let input = String(event.key);
    console.log("Key pressed:", input);

    let forceAmount = 50;

    if (modelLoaded && physicsBody) { // Check if the model is loaded and body exists
        switch (input) {
            case "w":
                physicsBody.applyForce(new window.CANNON.Vec3(0, 0, -forceAmount), physicsBody.position);
                break;
            case "s":
                physicsBody.applyForce(new window.CANNON.Vec3(0, 0, forceAmount), physicsBody.position);
                break;
            case "a":
                physicsBody.applyForce(new window.CANNON.Vec3(-forceAmount, 0, 0), physicsBody.position);
                break;
            case "d":
                physicsBody.applyForce(new window.CANNON.Vec3(forceAmount, 0, 0), physicsBody.position);
                break;
            case "Control":
                physicsBody.applyForce(new window.CANNON.Vec3(0, -forceAmount, 0), physicsBody.position);
                break;
            case " ":
                physicsBody.applyForce(new window.CANNON.Vec3(0, forceAmount, 0), physicsBody.position);
                break;
        }
        console.log("boxBody position:", physicsBody.position.x, physicsBody.position.y, physicsBody.position.z);
        camera.position.set(physicsBody.position.x + 3, physicsBody.position.y + 3, physicsBody.position.z + 3);
        console.log("Camera position:", camera.position.x, camera.position.y, camera.position.z);
        camera.lookAt(physicsBody.position);
        console.log("Camera lookAt:", physicsBody.position.x, physicsBody.position.y, physicsBody.position.z);
    } else {
        console.log("Model not loaded yet, or physicsBody not defined!");
    }
});

// animation

let timeStep = 1 / 60;

function animate() {
    requestAnimationFrame(animate);

    world.step(timeStep);

    if (modelLoaded && modelMesh && physicsBody) { // Check if the model is loaded
        modelMesh.position.copy(physicsBody.position);
        modelMesh.quaternion.copy(physicsBody.quaternion);
    }

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
