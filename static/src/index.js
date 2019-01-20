import * as THREE from 'three';
const OrbitControls = require('three-orbitcontrols')

const box_report = { '1': 0,'2': 0,'3': 0,'4': 0,'5': 0,'6': 0 };

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const t_loader = new THREE.TextureLoader();

var cube = new THREE.Object3D();

const valCube = [
    {
        position:{x:0,y:0,z:0.5},
        rotation:{x:0,y:0,z:0},
    },{
        position:{x:0.5,y:0,z:0},
       rotation:{x:0,y:90,z:0},
    },{
        position:{x:-0.5,y:0,z:0},
        rotation:{x:180,y:90+ 180,z:0},
    },{
        position:{x:0,y:0,z:-0.5},
       rotation:{x:0,y:180,z:0},
    },{
       position:{x:0,y:0.5,z:0},
        rotation:{x:90 + 180,y:0,z:0},
    },{
        position:{x:0,y:-0.5,z:0},
       rotation:{x:90,y:0,z:0},
    }
]

for (var i = 0; i < valCube.length; i++) {
   DrawCube(valCube[i], 1, i + 1);
}
scene.add(cube);

function DrawCube( e, path, el ){
    let material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: t_loader.load('res/1/' + el + '.jpg') } );
    let plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1, 1, 1 ), material );
    plane.name = el.toString();
    plane.position.set(e.position.x,e.position.y,e.position.z);
    plane.rotation.set(e.rotation.x*Math.PI/180, e.rotation.y*Math.PI/180, e.rotation.z*Math.PI/180);    
    cube.add( plane );
}

camera.position.z = 5;


l_1.onclick = function() { RotationElement("1", false, 'z') };
r_1.onclick = function() { RotationElement("1", true, 'z') };

l_2.onclick = function() { RotationElement("2", false, 'z') };
r_2.onclick = function() { RotationElement("2", true, 'z') };

l_3.onclick = function() { RotationElement("3", false, 'z') };
r_3.onclick = function() { RotationElement("3", true, 'z') };

function RotationElement( name, right, axis ){
    let el = scene.getObjectByName( name );
    if (right){
        el.rotation[axis] += 90*Math.PI/180;
    } else {
        el.rotation[axis] -= 90*Math.PI/180;
    }
    box_report[name] = el.rotation[axis] / Math.PI * 180;
    console.log(box_report);
}

var animate = function () {
    controls.update();
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};

animate();