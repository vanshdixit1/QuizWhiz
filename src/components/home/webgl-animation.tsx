"use client";

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const { viewport } = useThree();
  const [positions, colors] = useMemo(() => {
    const count = 5000;
    const positions = random.inSphere(new Float32Array(count * 3), { radius: 3 });
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    const purple = new THREE.Color('#8a2be2');
    const blue = new THREE.Color('#0000ff');

    for (let i = 0; i < count; i++) {
        color.copy(Math.random() > 0.5 ? purple : blue).lerp(new THREE.Color('white'), Math.random() * 0.5);
        color.toArray(colors, i * 3);
    }
    
    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
        ref.current.rotation.x -= delta / 25;
        ref.current.rotation.y -= delta / 30;
        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.pointer.x * (viewport.width / 4), 0.03);
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.pointer.y * (viewport.height / 4), 0.03);
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
            transparent
            vertexColors
            size={0.008}
            sizeAttenuation={true}
            depthWrite={false}
        />
    </Points>
  );
}

export function WebGLAnimation() {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <Particles />
        </Canvas>
    )
}
