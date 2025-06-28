import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Earth from "./Earth";

export default function EarthScene() {
  return (
    <div className="relative h-screen w-full">
      {/* 3D Earth Canvas */}
      <Canvas camera={{ position: [2, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={1} color="white" />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <Earth />
        <OrbitControls enableZoom={true} />
      </Canvas>


    </div>
  );
}
