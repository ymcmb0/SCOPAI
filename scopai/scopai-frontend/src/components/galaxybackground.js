import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GalaxyBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create a new scene
    const scene = new THREE.Scene();

    // Create a new camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Create a new renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000); // Set background color to black
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create stars
    const stars = new Array(1000).fill().map(() => {
      const star = new THREE.Vector3();
      star.x = Math.random() * 2000 - 1000;
      star.y = Math.random() * 2000 - 1000;
      star.z = -Math.random() * 1000;
      return star;
    });

    // Create star geometry
    const starGeometry = new THREE.BufferGeometry().setFromPoints(stars);

    // Create star material
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff }); // Set color to white

    // Create star field
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Set camera position
    camera.position.z = 0;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      starField.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    // Resize listener
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default GalaxyBackground;
