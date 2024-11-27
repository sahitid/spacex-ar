const scene = new THREE.Scene();
const camera = new THREE.Camera();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initialize AR Toolkit Source
var ArToolkitSource = new THREEx.ArToolkitSource({
    sourceType: 'webcam', // Corrected sourceType
    detectionMode: 'color_and_matrix'
});

ArToolkitSource.init(function () {
    ArToolkitSource.onResize();
    ArToolkitSource.copyElementSizeTo(renderer.domElement);
});

// Initialize AR Toolkit Context
var ArToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: 'camera_para.dat',
    detectionMode: 'color_and_matrix'
});

ArToolkitContext.init(function () {
    camera.projectionMatrix.copy(ArToolkitContext.getProjectionMatrix());
});

var ArMarkerControls = new THREEx.ArMarkerControls(ArToolkitContext, camera,
    {
        type: 'pattern',
        patternUrl: '',
        changeMatrixMode: 'cameraTransformMatrix'
    });

screen.visible = false
// Add a Cube to the Scene
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSit
});


const cube = new THREE.Mesh(geometry, material);
camera.position.y = geometry.parameters.height / 2;

scene.add(cube);


// Animation Loop
const animate = function () {
    requestAnimationFrame(animate);
    ArToolkitContext.update(ArToolkitSource.domElement);
    scene.visible = camera.visible;
    console.log(camera.visable)


    renderer.render(scene, camera);
}

animate();
