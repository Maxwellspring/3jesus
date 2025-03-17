
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import * as THREE from 'three';


const loader = new GLTFLoader();

function modelLoader(modelName) {
	loader.load(`model/${modelName}.gltf`, function (gltf) {
		scene.add(gltf.scene);
	}, undefined, function (error) {
		console.error(error);
	});
};



modelLoader("model");
modelLoader("TT");

const width = window.innerWidth, height = window.innerHeight;

// init

let number = 3

const camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 100);
camera.position.z = 3;
camera.position.x = 3;

document.addEventListener('keyup', function(event) {
	console.log('Key up:', event.key, 'Code:', event.code);
	number = parseInt(event.key)
	console.log(number) 
	camera.position.z = number;
camera.position.x = number;
	camera.position.y = number;
	return number
  });



camera.lookAt(0, 0, 0)

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

