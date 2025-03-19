
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import * as THREE from 'three';


const loader = new GLTFLoader();

const material2 = new THREE.LineBasicMaterial({ color: 0x964B00 });

function modelLoader(modelName) {
	loader.load(`model/${modelName}.gltf`, function (gltf) {
		gltf.scene.traverse((child) => {
			if (child.isMesh) {
				child.material = material2;
			}
		});
		scene.add(gltf.scene);
	}, undefined, function (error) {
		console.error(error);
	});
};



modelLoader("model");
modelLoader("TT");

const width = window.innerWidth, height = window.innerHeight;

// init

let inputNumber = 3

let isPressingX = false
let isPressingY = false

const camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 1000);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;




document.addEventListener('keydown', function (event) {
	console.log('Key up:', event.key, 'Code:', event.code);
	console.log(inputNumber)
	console.log(Number(event.key))
	if (Number(event.key) == NaN) {
		return
	} else {
		inputNumber = Number(event.key)
		console.log(inputNumber)
		if (inputNumber < 10 == true || inputNumber > -1 == true) {
			if (isPressingY == true) {
				camera.position.y = inputNumber;
			} else if (isPressingX == true) {
				camera.position.x = inputNumber;
			} else {
				camera.position.z = inputNumber;
			}
		}

	}
	console.log("finish!")
	camera.lookAt(0, 0, 0)
	return inputNumber;
});

document.addEventListener("keydown", function (event) {
	let input = event.key
	if (input == "x" == true) {
		isPressingX = true;
	}
	if (input == "y" == true) {
		isPressingY = true;
	}
	console.log("keydown detect")
	return [isPressingX, isPressingY]
});

document.addEventListener("keyup", function (event) {
	isPressingY = false
	isPressingX = false
	console.log("keyup detect")
	return [isPressingX, isPressingY]
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
	//   gltf.scene.position.x = 1

	renderer.render(scene, camera);

}

