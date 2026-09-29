// js/three-viewer.js — Three.js 3D Model Rendering Engine for STAR PLUS 1.2

(function() {
  window.activeViewers = window.activeViewers || [];

  window.disposeAllViewers = function() {
    if (!window.activeViewers || !window.activeViewers.length) return;
    window.activeViewers.forEach(function(v) {
      try {
        if (v && v.dispose) v.dispose();
      } catch (e) {
        console.warn('Error disposing viewer:', e);
      }
    });
    window.activeViewers = [];
  };

  window.createViewer = function(containerId, modelPath, opts) {
    opts = opts || {};
    var container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container) return null;

    // Clear previous contents if any
    container.innerHTML = '';

    var width = container.clientWidth || opts.width || (opts.mini ? 80 : 320);
    var height = container.clientHeight || opts.height || (opts.mini ? 80 : 320);

    var scene = new THREE.Scene();
    
    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    var camPos = opts.cameraPos || [0, 0, opts.mini ? 3.2 : 3.8];
    camera.position.set(camPos[0], camPos[1], camPos[2]);

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (renderer.outputColorSpace) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
    container.appendChild(renderer.domElement);

    // Lighting Setup
    var ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    var dirLight1 = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    var dirLight2 = new THREE.DirectionalLight(0x93c5fd, 0.9);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    var controls = null;
    if (!opts.mini && window.THREE && THREE.OrbitControls) {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.autoRotate = opts.autoRotate !== undefined ? opts.autoRotate : true;
      controls.autoRotateSpeed = 2.0;
    }

    var modelPivot = new THREE.Group();
    scene.add(modelPivot);

    var animFrameId = null;
    var isDisposed = false;

    // Load Textured GLTF / GLB Model
    if (window.THREE && THREE.GLTFLoader) {
      var loader = new THREE.GLTFLoader();
      loader.load(
        modelPath,
        function(gltf) {
          if (isDisposed) return;
          var model = gltf.scene;

          // Retain original textures and materials
          model.traverse(function(node) {
            if (node.isMesh) {
              node.castShadow = true;
              node.receiveShadow = true;
              if (opts.colorOverlay && node.material) {
                node.material = node.material.clone();
                node.material.color.setHex(opts.colorOverlay);
              }
            }
          });

          // Center and scale model to fit viewport bounding box
          var box = new THREE.Box3().setFromObject(model);
          var center = box.getCenter(new THREE.Vector3());
          var size = box.getSize(new THREE.Vector3());

          model.position.sub(center);
          
          var maxDim = Math.max(size.x, size.y, size.z);
          if (maxDim > 0) {
            var targetScale = opts.mini ? 1.8 : 2.2;
            var scale = targetScale / maxDim;
            model.scale.setScalar(scale);
          }

          modelPivot.add(model);
        },
        undefined,
        function(err) {
          console.warn('GLTF load fallback for ' + modelPath + ':', err);
          // Visual holographic fallback shape if GLB fails to fetch
          var geom = opts.mini ? new THREE.SphereGeometry(0.8, 16, 16) : new THREE.TorusKnotGeometry(0.8, 0.28, 64, 16);
          var mat = new THREE.MeshStandardMaterial({
            color: opts.colorOverlay || 0x1769E8,
            roughness: 0.3,
            metalness: 0.2,
            wireframe: false
          });
          var mesh = new THREE.Mesh(geom, mat);
          modelPivot.add(mesh);
        }
      );
    }

    // Render Animation Loop
    function animate() {
      if (isDisposed) return;
      animFrameId = requestAnimationFrame(animate);

      if (opts.autoRotate || opts.mini) {
        modelPivot.rotation.y += opts.mini ? 0.015 : 0.008;
      }

      if (controls) {
        controls.update();
      }

      renderer.render(scene, camera);
    }
    animate();

    var viewerInstance = {
      containerId: containerId,
      renderer: renderer,
      scene: scene,
      camera: camera,
      controls: controls,
      dispose: function() {
        isDisposed = true;
        if (animFrameId) cancelAnimationFrame(animFrameId);
        if (controls) controls.dispose();
        if (renderer && renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        if (renderer) renderer.dispose();
      }
    };

    window.activeViewers.push(viewerInstance);
    return viewerInstance;
  };

  // Manager namespace for backwards compatibility & lifecycle calls
  window.ThreeViewerManager = {
    create: window.createViewer,
    disposeAll: window.disposeAllViewers
  };
})();
