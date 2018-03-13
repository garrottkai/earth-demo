// author: Kai Garrott <garrottkai@gmail.com>

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').insertBefore(renderer.domElement, document.getElementById('overlay'));

var scene = new THREE.Scene();

var fov = 75;
var aspect = window.innerWidth / window.innerHeight;
var nearClippingPlane = 0.1;
var farClippingPlane = 5000;
var camera = new THREE.PerspectiveCamera(fov, aspect, nearClippingPlane, farClippingPlane);
camera.position.set(0, 0, 30);
var controls = new THREE.OrbitControls(camera);
controls.update();

var stats = new Stats();
document.body.appendChild(stats.dom);

//var lighting = new THREE.PointLight(0x89E3FF, 0.1, 0);
var texture = new THREE.TextureLoader().load('assets/elevation.png');
var material = new THREE.MeshBasicMaterial({
  map: texture,
});
var geometry = new THREE.SphereGeometry(15, 48, 48);
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh /*, lighting*/ );

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
}

animate();
