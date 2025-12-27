
"use client";

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const { positions, colors } = useMemo(() => {
    const count = 5000;
    const positions = random.inSphere(new Float32Array(count * 3), { radius: 1.5 });
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
        color.setHSL(Math.random(), 0.7, 0.7);
        color.toArray(colors, i * 3);
    }
    
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.pointer.x * 0.5, 0.03);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.pointer.y * 0.5, 0.03);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
            transparent
            vertexColors
            size={0.005}
            sizeAttenuation={true}
            depthWrite={false}
        />
    </Points>
  );
}

export const WebGLAnimation = () => {
    return (
        <Canvas camera={{ position: [0, 0, 2.5] }}>
            <Particles />
        </Canvas>
    )
}
