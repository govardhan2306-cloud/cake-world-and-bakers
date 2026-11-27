import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Hero3DCanvasProps {
  className?: string;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.8, 6.2);
    camera.lookAt(0, 0.4, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 2.2);
    dirLight.position.set(5, 8, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const softFillLight = new THREE.PointLight(0x873D35, 2.0, 10);
    softFillLight.position.set(-4, 2, 3);
    scene.add(softFillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
    rimLight.position.set(0, 4, -5);
    scene.add(rimLight);

    // 3D Cake World Showcase Group
    const cakeGroup = new THREE.Group();
    scene.add(cakeGroup);

    // 1. Ceramic Pedestal / Cake Stand
    const standMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.1,
    });
    const plateGeom = new THREE.CylinderGeometry(2.35, 2.4, 0.12, 48);
    const plate = new THREE.Mesh(plateGeom, standMaterial);
    plate.position.y = -0.55;
    plate.receiveShadow = true;
    cakeGroup.add(plate);

    const standBaseGeom = new THREE.CylinderGeometry(0.35, 1.1, 0.55, 32);
    const standBase = new THREE.Mesh(standBaseGeom, standMaterial);
    standBase.position.y = -0.85;
    cakeGroup.add(standBase);

    // 2. Bottom Tier (Rich Chocolate Sponge)
    const chocMaterial = new THREE.MeshStandardMaterial({
      color: 0x2b1810,
      roughness: 0.45,
      metalness: 0.15,
    });
    const tier1Geom = new THREE.CylinderGeometry(1.85, 1.85, 1.0, 48);
    const tier1 = new THREE.Mesh(tier1Geom, chocMaterial);
    tier1.position.y = 0.0;
    tier1.castShadow = true;
    tier1.receiveShadow = true;
    cakeGroup.add(tier1);

    // Middle Gold Cream Accent Ribbon
    const goldRibbonMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.3,
      metalness: 0.6,
    });
    const ribbonGeom = new THREE.CylinderGeometry(1.87, 1.87, 0.08, 48);
    const ribbon = new THREE.Mesh(ribbonGeom, goldRibbonMaterial);
    ribbon.position.y = -0.05;
    cakeGroup.add(ribbon);

    // 3. Top Tier (Velvety Ganache Cake)
    const ganacheMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d2314,
      roughness: 0.2,
      metalness: 0.2,
    });
    const tier2Geom = new THREE.CylinderGeometry(1.2, 1.2, 0.9, 48);
    const tier2 = new THREE.Mesh(tier2Geom, ganacheMaterial);
    tier2.position.y = 0.95;
    tier2.castShadow = true;
    cakeGroup.add(tier2);

    // 4. Glaze Drip Frosting on Top Tier
    const glazeMaterial = new THREE.MeshStandardMaterial({
      color: 0x873D35, // Brand Burgundy Accent Glaze
      roughness: 0.15,
      metalness: 0.3,
    });
    const glazeCapGeom = new THREE.CylinderGeometry(1.24, 1.24, 0.14, 48);
    const glazeCap = new THREE.Mesh(glazeCapGeom, glazeMaterial);
    glazeCap.position.y = 1.42;
    cakeGroup.add(glazeCap);

    // Cream piping rosettes around top
    const creamMaterial = new THREE.MeshStandardMaterial({
      color: 0xfffaf0,
      roughness: 0.3,
    });
    const rosetteCount = 8;
    for (let i = 0; i < rosetteCount; i++) {
      const angle = (i / rosetteCount) * Math.PI * 2;
      const rx = Math.cos(angle) * 0.95;
      const rz = Math.sin(angle) * 0.95;
      const rosette = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), creamMaterial);
      rosette.position.set(rx, 1.5, rz);
      cakeGroup.add(rosette);

      // Fresh Strawberries on Top
      const berryMaterial = new THREE.MeshStandardMaterial({
        color: 0xc41e3a,
        roughness: 0.3,
      });
      const berry = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.2, 16), berryMaterial);
      berry.rotation.x = Math.PI;
      berry.position.set(rx, 1.66, rz);
      cakeGroup.add(berry);
    }

    // 5. Crown Cherry / Strawberry Center Topper
    const crownBerry = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0x9e1b32, roughness: 0.15 })
    );
    crownBerry.position.set(0, 1.68, 0);
    cakeGroup.add(crownBerry);

    // 6. Floating Magical Gold & Burgundy Sparkle Particles
    const particleCount = 45;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0xd4af37);
    const c2 = new THREE.Color(0x873D35);
    const c3 = new THREE.Color(0xfff1db);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const py = -0.5 + Math.random() * 3.2;

      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = Math.sin(theta) * radius;

      const chosenColor = Math.random() > 0.5 ? c1 : Math.random() > 0.5 ? c2 : c3;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Interactive mouse / touch tilt tracking
    let targetRotY = 0;
    let targetRotX = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      targetRotY = mouseX * 0.55;
      targetRotX = -mouseY * 0.25;
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('touchmove', onPointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous gentle auto-spin + smooth mouse response
      cakeGroup.rotation.y += 0.007;
      cakeGroup.rotation.y += (targetRotY - (cakeGroup.rotation.y % (Math.PI * 2))) * 0.03;
      cakeGroup.rotation.x += (targetRotX - cakeGroup.rotation.x) * 0.05;

      // Gentle floating levitation
      cakeGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

      // Rotate sparkles
      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('touchmove', onPointerMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ touchAction: 'pan-y' }}
      title="Interactive 3D Cake World Showcase — Drag or move to rotate"
    />
  );
};
