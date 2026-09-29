// js/three-viewer.js — Apple-grade 3D Model Rendering Engine for STAR PLUS 1.2

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
    container.style.position = 'relative';

    var width = container.clientWidth || opts.width || (opts.mini ? 80 : 360);
    var height = container.clientHeight || opts.height || (opts.mini ? 80 : 340);

    var scene = new THREE.Scene();
    
    var camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    var initialCamPos = opts.cameraPos || [0, 0.1, opts.mini ? 3.0 : 3.6];
    camera.position.set(initialCamPos[0], initialCamPos[1], initialCamPos[2]);

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (renderer.outputColorSpace) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Apple Studio Lighting Setup
    var ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key Light (Warm Key)
    var keyLight = new THREE.DirectionalLight(0xfffaf0, 1.8);
    keyLight.position.set(6, 12, 8);
    scene.add(keyLight);

    // Rim / Backlight (Cool Aerospace Blue)
    var rimLight = new THREE.DirectionalLight(0x60a5fa, 1.4);
    rimLight.position.set(-6, 4, -6);
    scene.add(rimLight);

    // Soft fill from below
    var fillLight = new THREE.DirectionalLight(0xe0e7ff, 0.8);
    fillLight.position.set(0, -6, 4);
    scene.add(fillLight);

    var controls = null;
    var autoRotateActive = opts.autoRotate !== undefined ? opts.autoRotate : true;

    if (!opts.mini && window.THREE && THREE.OrbitControls) {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.enableZoom = true;
      controls.autoRotate = false; // We manage rotation on modelPivot for smooth float
      controls.minDistance = 1.2;
      controls.maxDistance = 8.0;
    }

    var modelPivot = new THREE.Group();
    scene.add(modelPivot);

    var loadedMeshes = [];
    var isWireframe = false;
    var clock = new THREE.Clock();
    var animFrameId = null;
    var isDisposed = false;

    // Optional Ground Shadow Pedestal Ring for large viewers
    if (!opts.mini) {
      var shadowGeom = new THREE.RingGeometry(0.2, 1.4, 32);
      var shadowMat = new THREE.MeshBasicMaterial({
        color: 0x0f172a,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide
      });
      var shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
      shadowMesh.rotation.x = -Math.PI / 2;
      shadowMesh.position.y = -1.35;
      scene.add(shadowMesh);
    }

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
              loadedMeshes.push(node);
              node.castShadow = true;
              node.receiveShadow = true;
              if (node.material) {
                if (Array.isArray(node.material)) {
                  node.material = node.material.map(function(m) { return m.clone(); });
                } else {
                  node.material = node.material.clone();
                }
              }
              if (opts.colorOverlay && node.material && node.material.color) {
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
            var targetScale = opts.mini ? 1.8 : 2.1;
            var scale = targetScale / maxDim;
            model.scale.setScalar(scale);
          }

          modelPivot.add(model);
        },
        undefined,
        function(err) {
          console.warn('GLTF load fallback for ' + modelPath + ':', err);
          // Visual holographic fallback shape if GLB fails to fetch
          var geom = opts.mini ? new THREE.SphereGeometry(0.85, 24, 24) : new THREE.TorusKnotGeometry(0.8, 0.28, 64, 16);
          var mat = new THREE.MeshStandardMaterial({
            color: opts.colorOverlay || 0x0071E3,
            roughness: 0.2,
            metalness: 0.3,
            wireframe: false
          });
          var mesh = new THREE.Mesh(geom, mat);
          loadedMeshes.push(mesh);
          modelPivot.add(mesh);
        }
      );
    }

    // Render Animation Loop with Gentle Sine Float
    function animate() {
      if (isDisposed) return;
      animFrameId = requestAnimationFrame(animate);

      var elapsed = clock.getElapsedTime();

      if (autoRotateActive || opts.mini) {
        modelPivot.rotation.y += opts.mini ? 0.018 : 0.007;
      }

      // Gentle floating breathing animation for biological feel
      if (!opts.mini) {
        modelPivot.position.y = Math.sin(elapsed * 1.4) * 0.035;
      }

      if (controls) {
        controls.update();
      }

      renderer.render(scene, camera);
    }
    animate();

    // Floating Glass Toolbar on Large 3D Viewers
    var toolbarEl = null;
    if (!opts.mini) {
      toolbarEl = document.createElement('div');
      toolbarEl.className = 'canvas-3d-toolbar';
      toolbarEl.innerHTML = 
        '<button class="tool-btn" id="tb-rotate-' + Math.random().toString(36).substr(2, 4) + '" title="Toggle Rotation">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>' +
        '</button>' +
        '<button class="tool-btn" id="tb-wire-' + Math.random().toString(36).substr(2, 4) + '" title="Toggle X-Ray Wireframe">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>' +
        '</button>' +
        '<button class="tool-btn" id="tb-reset-' + Math.random().toString(36).substr(2, 4) + '" title="Reset View">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>' +
        '</button>';
      
      container.appendChild(toolbarEl);

      var btnRotate = toolbarEl.children[0];
      var btnWire = toolbarEl.children[1];
      var btnReset = toolbarEl.children[2];

      if (btnRotate) {
        btnRotate.addEventListener('click', function(e) {
          e.stopPropagation();
          autoRotateActive = !autoRotateActive;
          btnRotate.classList.toggle('active', autoRotateActive);
        });
      }

      if (btnWire) {
        btnWire.addEventListener('click', function(e) {
          e.stopPropagation();
          isWireframe = !isWireframe;
          btnWire.classList.toggle('active', isWireframe);
          loadedMeshes.forEach(function(m) {
            if (m.material) {
              if (Array.isArray(m.material)) {
                m.material.forEach(function(mat) { mat.wireframe = isWireframe; });
              } else {
                m.material.wireframe = isWireframe;
              }
            }
          });
        });
      }

      if (btnReset) {
        btnReset.addEventListener('click', function(e) {
          e.stopPropagation();
          camera.position.set(initialCamPos[0], initialCamPos[1], initialCamPos[2]);
          if (controls) controls.reset();
          modelPivot.rotation.set(0, 0, 0);
        });
      }
    }

    // Responsive Canvas Resize Observer
    var resizeObserver = null;
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          var w = entry.contentRect.width;
          var h = entry.contentRect.height;
          if (w > 0 && h > 0 && !isDisposed) {
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
          }
        }
      });
      resizeObserver.observe(container);
    }

    var viewerInstance = {
      containerId: containerId,
      renderer: renderer,
      scene: scene,
      camera: camera,
      controls: controls,
      dispose: function() {
        isDisposed = true;
        if (animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = null;
        }
        if (resizeObserver) {
          resizeObserver.disconnect();
          resizeObserver = null;
        }
        if (controls) {
          controls.dispose();
          controls = null;
        }
        if (renderer) {
          if (renderer.domElement && renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
          if (renderer.forceContextLoss) {
            renderer.forceContextLoss();
          }
          renderer.dispose();
          renderer = null;
        }
        if (toolbarEl && toolbarEl.parentNode) {
          toolbarEl.parentNode.removeChild(toolbarEl);
          toolbarEl = null;
        }
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
