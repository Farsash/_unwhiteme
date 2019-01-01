import * as THREE from 'three';

const dev = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
const contener = document.getElementById('_threejs_view');

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 300, 300 );


contener.appendChild( renderer.domElement );

let t_load = new THREE.TextureLoader();

let map = t_load.load('/assets/uploads/6.jpg');

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0xffffff, map:map } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();