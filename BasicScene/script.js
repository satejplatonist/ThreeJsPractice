import  * as THREE from 'three';
import './style.css'

// scene
const scene = new THREE.Scene();

// mesh for cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:0xff0000});
const cubemesh = new THREE.Mesh(geometry,material);
scene.add(cubemesh);

// Position
// you can also move objects and cameras 
// cubemesh.position.y=0.8;
// cubemesh.position.x=-0.3;
// cubemesh.position.z=0.4;
cubemesh.position.set(0.7,-0.6,1) // set all three at once

// Scale
//cubemesh.scale.x=1.4;
cubemesh.scale.set(1.4,1,1);

// Rotation or quarternion
// be carefull about the order of rotations during rotations as the axis changes
// eg if you rotate on x axis then y is not straight but bend 
// if not done properly gimbal lock may occur
// soln : reorder , before the rotations
// a better soln is to use quaternion
cubemesh.rotation.reorder('ZYX');
cubemesh.rotation.y = Math.PI * 0.55;
cubemesh.rotation.x = Math.PI * 0.25;

// axis helper to see axis x-red , y-green , z-blue
const axis  = new THREE.AxesHelper();
scene.add(axis);

// distance from center of scene to object(it is very precise)
console.log(cubemesh.position.length());
cubemesh.position.normalize();
console.log(cubemesh.position.length());
// sizes
const sizes = {
    width:800,height:600
}

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);
// x axis is to move object left and right 
// y axis is to move object upwards and downwards 
// z axis is to move object towards you and farther from you i.e (inside - out)
// position and fn of x,y,z axis also depends on camera position (it may change)
camera.position.z = 3;

// used to look at particular object or position you can also do new THREE.Vector3(1,2,3)
// camera.lookAt(cubemesh.position);
scene.add(camera);
// distance from object to camera
console.log(cubemesh.position.distanceTo(camera.position));

// renderer
const canvas = document.querySelector('.canvasToRenderOn');
console.log(canvas);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width,sizes.height);

// render
renderer.render(scene,camera);