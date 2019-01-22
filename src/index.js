import * as THREE from 'three';
import { folder, To_send} from "./getserver.js";

const SendServer = new To_send();



const OrbitControls = require('three-orbitcontrols')

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 2;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.update();

const t_loader = new THREE.TextureLoader();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let INTERSECTED;
let SELECTELEMENT = '1';
const select_material = new THREE.MeshBasicMaterial( { color: 0x33ff33, transparent:true, wireframe:true } );

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
    let material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: t_loader.load('../static/edit/' + el + '.jpg') } );
    let plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1, 1, 1 ), material );
    plane.name = el.toString();
    plane.position.set(e.position.x,e.position.y,e.position.z);
    plane.rotation.set(e.rotation.x*Math.PI/180, e.rotation.y*Math.PI/180, e.rotation.z*Math.PI/180);    
    cube.add( plane );
}




arrow_l.onclick = function() { RotationElement(SELECTELEMENT, false, 'z') };
arrow_r.onclick = function() { RotationElement(SELECTELEMENT, true, 'z') };

let ui_fldr = document.getElementById('ui_folder');
ui_fldr.innerHTML = '1';



window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'click', onMouseDown, false );

let select_object;

function onMouseDown() {
    
    if(INTERSECTED){
        scene.remove(select_object);
        select_object = INTERSECTED.clone();
        select_object.material = select_material;
        scene.add(select_object);
        SELECTELEMENT = INTERSECTED.name;
        console.log(SELECTELEMENT);
    }

}

function onMouseMove( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function RotationElement( name, right, axis ){
    let el = scene.getObjectByName( name );
    if (right){
        el.rotation[axis] += 90*Math.PI/180;
    } else {
        el.rotation[axis] -= 90*Math.PI/180;
    }
    SendServer.box_report[name] = el.rotation[axis] / Math.PI * 180;
    console.log(SendServer.box_report);
    SendServer.send();
}

var animate = function () {
    controls.update();

	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( cube.children );

    if ( intersects.length > 0 ) {
        if ( INTERSECTED != intersects[ 0 ].object ) {
            
            if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            INTERSECTED.material.color.setHex( 0x007700 );
           
        }
    } else {
        
        if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
        INTERSECTED = null;
        
    }


    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};

animate();