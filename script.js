import * as THREE from 'three';

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 60, width / height, 0.01, 100 );
camera.position.z = 1;
camera.position.x = 0.1;
camera.position.y = 0.2;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.1, 0.4, 0.2 );
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: false } );
renderer.setSize( width, height, );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// animation

function animate( time ) {

	mesh.rotation.x = time / 1000;
	mesh.rotation.y = time / 100;
  mesh.rotation.z = time / 1000;

	renderer.render( scene, camera );

}