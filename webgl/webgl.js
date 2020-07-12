// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");
const {lerp} = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');


// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
    // Make the loop animated
    animate: true,
    // Get a WebGL canvas rather than 2D
    context: "webgl"
};

const sketch = ({context}) => {
    // Create a renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: context.canvas
    });

    // WebGL background color
    renderer.setClearColor("#272d66", 1);

    // Setup a camera
    const camera = new THREE.OrthographicCamera();
    camera.position.set(0, 0, -4);
    camera.lookAt(new THREE.Vector3());

    // Setup camera controller
    // const controls = new THREE.OrbitControls(camera, context.canvas);

    // Setup your scene
    const scene = new THREE.Scene();

    // Setup a geometry
    const geometry = new THREE.BoxBufferGeometry(1, 1, 1);


    ////////////////////////////////////////////////////////////////////PALETTE
    const palette = random.pick(palettes);
    const materials = [];
    for (let i = 0; i < 3; i++) {
        let material = new THREE.MeshStandardMaterial();
        material.color = new THREE.Color(random.pick(palette));
        materials.push(material);
    }

    ////////////////////////////////////////////////////////////////////MESH LOOP

    for (let i = 0; i < 50; i++) {
        // Setup a material
        let material = materials[Math.floor(random.range(0,4))];

        // Setup a mesh with geometry + material
        const mesh = new THREE.Mesh(geometry, material);

        const positionFactor = 2;

        mesh.scale.set(
            random.range(-1, 1),
            random.range(-1, 1),
            random.range(-1, 1),
        );

        mesh.position.set(
            random.range(-1, 1),
            random.range(-1, 1),
            random.range(-1, 1),
        );

        // Scale the size
        mesh.scale.multiplyScalar(0.5);

        scene.add(mesh);
    }

    ////////////////////////////////////////////////////////////////////LIGHT

    const light = new THREE.DirectionalLight('white', 1);
    light.position.set(0, 0, 4);
    scene.add(light);

    scene.add(new THREE.AmbientLight(new THREE.Color(random.pick(palette))));
    // draw each frame
    return {
        // Handle resize events here
        resize({pixelRatio, viewportWidth, viewportHeight}) {
            const aspect = viewportWidth / viewportHeight;

            // Ortho zoom
            const zoom = 5;

            // Bounds
            camera.left = -zoom * aspect;
            camera.right = zoom * aspect;
            camera.top = zoom;
            camera.bottom = -zoom;

            // Near/Far
            camera.near = -100;
            camera.far = 100;

            // Set position & look at world center
            camera.position.set(zoom, zoom, zoom);
            camera.lookAt(new THREE.Vector3());

            // Update the camera
            camera.updateProjectionMatrix();
        },
        // Update & render your scene here
        render({time}) {

            //Rotate the sphere
            // mesh.rotation.y = time * .2;
            // mesh.rotation.x = time * .5;
            // mesh.rotation.z = time * .5;
            // mesh.position.y = Math.cos(time) * .5;

            // controls.update();
            renderer.render(scene, camera);
        },
        // Dispose of events & renderer for cleaner hot-reloading
        unload() {
            // controls.dispose();
            renderer.dispose();
        }
    };
};

canvasSketch(sketch, settings);
