import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import GUI from "lil-gui";
/* import gsap from "gsap";
 */

//lil-gui
const gui = new GUI({
  width: 200,
  title: "Lil-GUI test",
  closeFolders: true
});
gui.close();

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//cursor
const cursor = {
  x: 0,
  y: 0
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  /* console.log("x=", cursor.x);
  console.log("y=", cursor.y); */
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const debugObject = {
  color: 0xff0000
};

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

//lil-gui

const tweaksPosition = gui.addFolder("Position");
const tweakMaterial = gui.addFolder("Material");
const tweakSpecial = gui.addFolder("Special");

tweaksPosition
  .add(mesh.position, "y")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("elevation");
tweaksPosition
  .add(mesh.position, "x")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("horizontal");
tweaksPosition.add(mesh.position, "z").min(-3).max(3).step(0.01).name("depth");
tweakMaterial.add(mesh, "visible");
tweakMaterial.add(mesh.material, "wireframe");
tweakMaterial.addColor(debugObject, "color").onChange(() => {
  material.color.set(debugObject.color);
});

debugObject.spin = () => {
  gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 });
};

tweakSpecial.add(debugObject, "spin");
debugObject.subdivision = 2;
tweakMaterial
  .add(debugObject, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .onChange(() => {
    mesh.geometry.dispose();
    const newGeometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision
    );
    mesh.geometry = newGeometry;
  });

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = true;
controls.enablePan = true;

controls.update();

/* const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio,
  1 * aspectRatio,
  1,
  -1,
  0.1,
  1000
); */

camera.position.z = 2;
/* camera.position.x = 2;
camera.position.y = 2; */
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//clock
const clock = new THREE.Clock();
/* gsap.to(mesh.position, { duration: 1, delay: 1, x: 0 });
 */ /* gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });
 */
// Animation
const tick = () => {
  //time
  const elapsedTime = clock.getElapsedTime();

  //update objects
  /* mesh.position.y = Math.sin(elapsedTime);
  mesh.position.x = Math.cos(elapsedTime); */
  /* camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  camera.position.y = cursor.y * 5;
  camera.lookAt(mesh.position); */

  //render
  /*   mesh.rotation.y = Math.sin(clock.getElapsedTime());
   */ renderer.render(scene, camera);
  //update controls
  controls.update();

  window.requestAnimationFrame(tick);
};

tick();
