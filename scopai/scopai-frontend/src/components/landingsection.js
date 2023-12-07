import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styled, { keyframes } from "styled-components";
import Footer from './footer';
import Header from './header';
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const changeColor = keyframes`
  from {
    background-color: #4caf50;
  }
  to {
    background-color: #9c27b0;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  font-size: 24px;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease-out forwards;
`;

const HeroTitle = styled.h1`
  margin: 0;
`;

const HeroParagraph = styled.p`
  margin: 0;
`;

const GetStartedButton = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  &:hover {
    animation: ${changeColor} 0.5s forwards;
  }
`;

const LandingPage = () => {
  const canvasRef = useRef(null);
  const [hoveredMesh, setHoveredMesh] = useState(null);
  const cameraRef = useRef(null); // Create a ref for the camera
  const rendererRef = useRef(null); // Create a ref for the renderer
   let renderer;
  // Move handleResize function to the top
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight); const { current: camera } = cameraRef; // Destructure the ref
    if (camera) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      const { current: renderer } = rendererRef; // Destructure the renderer ref
      if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    }
  };

  useEffect(() => {
   const scene = new THREE.Scene();

    // Initialize camera and renderer
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera; // Assign camera to the ref

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer; // Assign renderer to the ref

    // Set scene background
    const backgroundTexture = new THREE.TextureLoader().load("/images/faded_background.jpg");
    scene.background = new THREE.MeshBasicMaterial({ map: backgroundTexture });

    // Create and animate background graphs
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x9c27b0, linewidth: 2 });
    const vertices = [];
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 10 - 5;
      const y = Math.random() * 10 - 5;
      vertices.push(x, y, 0);
    }
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    const lineMesh = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Create and animate meshes
    const sphereGeometry = new THREE.SphereGeometry(0.5);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x9c27b0 });
    const meshes = [];
    for (let i = 0; i < 10; i++) {
      const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      mesh.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
      mesh.userData.originalColor = new THREE.Color(0x9c27b0);
      scene.add(mesh);
      meshes.push(mesh);
    }

    const handleMeshClick = (event) => {
      if (hoveredMesh) {
        const newColor = new THREE.Color(Math.random(), Math.random(), Math.random());
        hoveredMesh.material.color.copy(newColor);
      }
    };

    const handleMeshHover = (event) => {
      const intersects = getIntersects(event.clientX, event.clientY);
      if (intersects.length > 0) {
        const mesh = intersects[0].object;
        setHoveredMesh(mesh);
      } else {
        setHoveredMesh(null);
      }
    };

    const getIntersects = (x, y) => {
      const mouseVector = new THREE.Vector2();
      mouseVector.x = (x / window.innerWidth) * 2 - 1;
      mouseVector.y = -(y / window.innerHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouseVector, camera);

      return raycaster.intersectObjects(meshes);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleMeshClick);
    window.addEventListener("mousemove", handleMeshHover);


    // Animate scene
    const animate = () => {
      requestAnimationFrame(animate);

      // Update background graphs
      lineMesh.position.x += 0.01;
      lineMesh.rotation.y += 0.01;

      // Update meshes
      scene.children.forEach((mesh) => {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Clean up resources on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleMeshClick);
      window.removeEventListener("mousemove", handleMeshHover);
      renderer.dispose(); // Dispose renderer
    };
  }, [hoveredMesh]);

  return (
  <>
  <Header />
    <main className="main">
      <section className="hero">
        <canvas ref={canvasRef} className="background-canvas" />
        <TextContainer>
          <HeroTitle>Optimize Your Workflow</HeroTitle>
          <HeroParagraph>Scopai is a powerful tool that empowers teams</HeroParagraph>
          <HeroParagraph>to manage projects, collaborate seamlessly,</HeroParagraph>
          <HeroParagraph>and achieve greater efficiency.</HeroParagraph>
          <GetStartedButton href="#">Get Started</GetStartedButton>
        </TextContainer>
      </section>
    </main>
    <Footer />
    </>
  );
};

export default LandingPage;
