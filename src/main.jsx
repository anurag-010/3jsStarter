import * as THREE from 'three';
import './index.css'
import { render } from 'react-dom';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';

//Scene
const scene = new THREE.Scene(); // Corrected

// Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);

// Create a material 
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.5,
})

//Mesh is combination of geometry and material
const mesh = new THREE.Mesh(geometry, material);
//ADD this to the scene AND pass it  to the mesh
scene.add(mesh);


//Sizes

const sizes = {
  width: window.innerWidth,
  height : window.innerHeight,
}



//Light
const light = new THREE.DirectionalLight(0xffffff, 70, 100, 1.7);
light.position.set(0, 10, 10);
light.intensity= 1.25
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100);
//Push the camera back as it's on top of our sphere
camera.position.z = 20;
scene.add(camera);


// To render the scene with the code we need a canvas so  we add a canvas in INDEX.HTML
//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//Controls

const controls = new OrbitControls(camera,canvas)

controls.enableDamping = true 
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 8








// Resize

window.addEventListener("resize",()=>{
  //Updates sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //Update camera
 camera.updateProjectionMatrix()
  camera.aspect = sizes.width/sizes.height
  renderer.setSize(sizes.width,sizes.height)
})

const loop = () =>{
 controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)

}
loop()


//Timeline
// Allows us to synchronize multiple animation together

const t1 = gsap.timeline({
  defaults:{
    duration:1
  }
})
t1.fromTo(mesh.scale,{z:0,x:0,y:0}, {z:1,x:1,y:1})

t1.fromTo('nav',{y:'-100%'},{y:'0%'})
t1.fromTo("title",{opacity:0},{opacity:1})



//Mouse Animation Color

let mouseDown = false
let rgb= []
window.addEventListener('mousedown',()=>(mouseDown=true))
window.addEventListener('mouseup',()=>(mouseDown=false))

window.addEventListener("mousemove",(e)=>{
  if(mouseDown){
    rgb= [
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageY/sizes.height)*255),
      150,
    ]
    //Animate

    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    
    gsap.to(mesh.material.color,{r:newColor.r,g:newColor.g,b:newColor.b})
  }
})