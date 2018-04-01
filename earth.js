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

var getArray = (csv) => {
  let lines = csv.split('\n');
  lines.map(line => line.split(','));
  return lines;
};

var addData = (data) => {
  var dataGeometry = new THREE.Geometry();
  var dataMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF
  });
  data.forEach(point => {
    let [lat, long, val] = point;
    let phi = (Math.PI / 180) * lat;
    let theta = (Math.PI / 180) * (long - 180);

    let x = -16 * Math.cos(phi) * Math.cos(theta);
    let y = 16 * Math.sin(phi);
    let z = 16 * Math.cos(phi) * Math.sin(theta);

    let dataVector = new THREE.Vector3(x, y, z);
    let dataCylinder = new THREE.Mesh(new THREE.CylinderBufferGeometry(.1, .1, 16, 5, 5));
    //let dataCylinder = new THREE.CylinderBufferGeometry(.1, .1, 16, 5, 5);
    dataCylinder.position = dataVector;
    dataCylinder.lookAt(new THREE.Vector3(0, 0, 0));
    dataGeometry.mergeMesh(dataCylinder);
  });
  let allData = new THREE.Mesh(dataGeometry, new THREE.MeshFaceMaterial());
  scene.add(allData);
};

//$(document).ready(() => {
jQuery.get('data/data.csv', data => {
  data = getArray(data);
  addData(data);console.log('wat')
});
//});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
}

animate();
