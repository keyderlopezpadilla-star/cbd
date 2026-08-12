'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.3
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} scale={1.5}>
        <torusKnotGeometry args={[0.5, 0.15, 100, 16]} />
        <MeshDistortMaterial
          color="#00FF66"
          attach="material"
          distort={0.3}
          speed={1}
          roughness={0.2}
          metalness={0.8}
          emissive="#00FF66"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  )
}

export function Login3D() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-30">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#00FF66" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00D95F" />
          <FloatingShape />
        </Suspense>
      </Canvas>
    </div>
  )
}
