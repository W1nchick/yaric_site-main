"use client"

import { Canvas, useThree } from "@react-three/fiber"
import Model from "./Model"
import './model.css'
import * as THREE from 'three'
import { Suspense, useRef } from "react"
import { useProgress, Html, useGLTF } from "@react-three/drei"
import { PerspectiveCamera } from "@react-three/drei"
import { Euler, Group, Vector3 } from "three"
function Loader() {
  const { progress } = useProgress()

  return <Html center>{progress.toFixed(1)} % loaded</Html>
}
function SceneCamera() {
  const { camera }: { camera: THREE.PerspectiveCamera } = useThree();
  camera.near = 1;
  camera.far = 1000;
  camera.position.set(0,0.8,-2);
  camera.rotation.set(0.2,3.15,0);
  camera.fov = 60;
  camera.updateProjectionMatrix()
  return <PerspectiveCamera makeDefault></PerspectiveCamera>;
}
export default function Scene(id: {id:string}) {
  const group = useRef<Group>(null)
  const t1 = useGLTF(`/t${id.id}.glb`)
  const rot = new Euler()
  const pos = new Vector3()
  rot.set(0,1.5,0)
  pos.set(0,1.5,0.8)
  if (id.id=='3') {rot.set(0,0,0);pos.set(0,1.2,0.6)}
  else if (id.id=='4') {rot.set(0,1.41,0);pos.set(0,1.3,0.8)}
  return (
    <div id='absol' className="main">
      <div className="canv">
        <Canvas>
          <SceneCamera />
          <directionalLight position={[0, 10, -15]} intensity={3} />
          <Suspense fallback={<Loader />}>
            <Model />
            <group rotation={rot} position={pos} ref={group}>
              <primitive object={t1.scene} />
            </group>
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
