// Earth.jsx
import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

export default function Earth() {
  const [colorMap, nightMap, specMap, cloudMap] = useLoader(TextureLoader, [
    "/textures/earth_daymap.jpg",
    "/textures/earth_nightmap.jpg",
    "/textures/earth_specularmap.jpg",
    "/textures/earth_clouds.jpg",
  ]);

  const earthRef = useRef();
  const cloudsRef = useRef();

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsed * 0.1;
    cloudsRef.current.rotation.y = elapsed * 0.12;
  });

  return (
    <>
      {/* Earth Sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          specularMap={specMap}
          specular={new THREE.Color("gray")}
        />
        <meshStandardMaterial
          map={colorMap}
          roughnessMap={specMap}
          metalness={0.4}
          roughness={1}
        />
      </mesh>

      {/* Cloud Layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshPhongMaterial
          map={cloudMap}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}
