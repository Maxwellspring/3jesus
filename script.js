
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import * as THREE from 'three';

const loader = new GLTFLoader();
const material2 = new THREE.LineBasicMaterial({ color: 0xbfbfbf });
const material3 = new THREE.LineBasicMaterial({ color: 0x98eb7a });

function modelLoader(modelName, materialName) {
	loader.load(`model/${modelName}.gltf`, function (gltf) {
		gltf.scene.traverse((child) => {
			if (child.isMesh) {
				child.material = materialName;
			}
		});
		scene.add(gltf.scene);
	}, undefined, function (error) {
		console.error(error);
	});
};

modelLoader("model", material3);
modelLoader("TT", material2);

const width = window.innerWidth, height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 1000);
let CX = camera.position.x = 3;
let CY = camera.position.y = 3;
let CZ = camera.position.z = 3;
camera.lookAt(0, 0, 0)

document.addEventListener("keydown", function (event) {
	event.preventDefault()
	console.log(event.key)
	let input = String(event.key)
	switch (input) {
		case "w":
			CZ -= 0.1;
			break;
		case "s":
			CZ += 0.1;
			break;
		case "a":
			CX -= 0.1;
			break;
		case "d":
			CX += 0.1;
			break;
		case "Control":
			CY -= 0.1;
			break;
		case " ":
			CY += 0.1;
			break;

	}
	camera.position.set(CX, CY, CZ)
	camera.lookAt(0, 0, 0)
})

const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', function (event) {
	const file = event.target.files[0];
	const url = URL.createObjectURL(file);
	loader.load(url, function (gltf) {
		gltf.scene.traverse((child) => {
			if (child.isMesh) {
				// You can add material handling here if needed
			}
		});
		scene.add(gltf.scene);
		URL.revokeObjectURL(url); // Clean up the URL
	});

});

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.1, 0.4, 0.2);
const floorGeometry = new THREE.BoxGeometry(1, 0.01, 1);
const material = new THREE.LineBasicMaterial({ color: 0x964B00 });
const boxMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });

const backMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
const backGeometry = new THREE.BoxGeometry(10, 10, 0.01);

const mesh = new THREE.Mesh(geometry, boxMaterial);
const myMesh = new THREE.Mesh(floorGeometry, material);
const back = new THREE.Mesh(backGeometry, backMaterial)
scene.add(mesh);
scene.add(myMesh);
scene.add(back);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height,);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// animation

function animate(time) {

	mesh.rotation.x = time / 1000;
	mesh.rotation.y = time / 100;
	mesh.rotation.z = time / 1000;
	myMesh.position.y = -0.4
	back.position.z = -1.2

	renderer.render(scene, camera);
}