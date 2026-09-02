import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export const Gojo3DCanvas = () => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // 1. Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 6.0);

    // 2. 100% Transparent WebGL Renderer (No background box color)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // 100% Transparent

    if (THREE.SRGBColorSpace) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 2.0;
    controls.maxDistance = 12;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.autoRotate = false;

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x15d8b3, 3.5);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe63946, 3.5);
    dirLight2.position.set(-5, -3, 5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 2, 10);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);

    // 5. Load Textures for Flying Phoenix Bird
    const textureLoader = new THREE.TextureLoader();
    const diffuseMap = textureLoader.load('/models/phoenix-bird/textures/Tex_Ride_FengHuang_01a_D_A.tga.png');
    const emissiveMap = textureLoader.load('/models/phoenix-bird/textures/Tex_Ride_FengHuang_01a_E.tga.png');

    const birdMaterial = new THREE.MeshStandardMaterial({
      map: diffuseMap,
      emissiveMap: emissiveMap,
      emissive: 0x15d8b3,
      emissiveIntensity: 0.8,
      roughness: 0.25,
      metalness: 0.1,
      side: THREE.DoubleSide
    });

    // 6. Load FBX 3D Model from /models/phoenix-bird/source/fly.fbx
    const fbxLoader = new FBXLoader();
    let mixer;
    let model;

    fbxLoader.load(
      '/models/phoenix-bird/source/fly.fbx',
      (fbx) => {
        model = fbx;

        // Auto-center and scale Phoenix Bird model
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.8 / maxDim;
        model.scale.set(scale, scale, scale);

        const scaledBox = new THREE.Box3().setFromObject(model);
        const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
        model.position.sub(scaledCenter);

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material = birdMaterial;
            }
          }
        });

        scene.add(model);

        // Play wing flap flight animation
        if (fbx.animations && fbx.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          fbx.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
          });
        }

        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('FBX loading error:', error);
        setLoading(false);
      }
    );

    // --- Floating Feather / Magic Particle Swarm ---
    const particleCount = 350;
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 10;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x15d8b3,
      transparent: true,
      opacity: 0.85
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // 7. Dynamic Flying Flight Path Animation Loop
    let animationFrameId;
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = (now - lastTime) * 0.001;
      lastTime = now;

      if (mixer) mixer.update(delta);

      if (model) {
        // Floating 3D Flight Trajectory Motion
        const t = now * 0.0012;
        model.position.x = Math.sin(t * 0.7) * 1.2;
        model.position.y = Math.sin(t * 1.4) * 0.35;
        model.position.z = Math.cos(t * 0.7) * 0.6;
        model.rotation.z = Math.sin(t * 0.7) * 0.12;
        model.rotation.y = Math.sin(t * 0.4) * 0.3;
      }

      particleSystem.rotation.y = now * 0.00005;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] flex items-center justify-center select-none overflow-hidden">
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute z-20 flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#15D8B3]/20 border-t-[#15D8B3] rounded-full animate-spin"></div>
          <span className="text-xs font-mono text-[#15D8B3] font-bold">
            Loading Flying 3D Model...
          </span>
        </div>
      )}

      {/* 100% Transparent WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
      />
    </div>
  );
};

export default Gojo3DCanvas;
