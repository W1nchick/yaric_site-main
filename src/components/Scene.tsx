"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import Model from "./Model"
import './model.css'
import * as THREE from 'three'
import { Suspense, useRef, useState } from "react"
import { useProgress, Html, useGLTF } from "@react-three/drei"
import { PerspectiveCamera } from "@react-three/drei"
import { Group } from "three"
import { useRouter } from "next/navigation"
function Loader() {
  const { progress} = useProgress()

  return <Html center>{progress.toFixed(1)} % loaded</Html>
}
function SceneCamera(pos: {pos:number[]}) {
  const { camera }: { camera: THREE.PerspectiveCamera } = useThree();
  camera.near = 1;
  camera.far = 1000;
  camera.position.set(0,1.5,-2);
  camera.rotation.set(0.2,3.15,0);
  if (window.innerWidth/window.innerHeight < 0.6) {camera.fov = 120;}
  else if (window.innerWidth/window.innerHeight < 0.8) {camera.fov = 110;}
  else if (window.innerWidth/window.innerHeight < 1) {camera.fov = 100;}
  else {camera.fov = 60;}
  camera.updateProjectionMatrix()
  useFrame(()=> {
    if (window.innerWidth/window.innerHeight < 0.6) {camera.fov = 120;}
    else if (window.innerWidth/window.innerHeight < 0.8) {camera.fov = 110;}
    else if (window.innerWidth/window.innerHeight < 1) {camera.fov = 100;}
    else {camera.fov = 60;}
    if (camera.position.x!=pos.pos[0] || camera.position.y!=pos.pos[1] || camera.position.z!=pos.pos[2]) {
      camera.position.set(pos.pos[0],pos.pos[1],pos.pos[2]);
    }
  })
  return <PerspectiveCamera makeDefault></PerspectiveCamera>;
}
export default function Scene() {
  const router = useRouter()
  const [pos, setpos] = useState([0,1.5,-2])
  const group = useRef<Group>(null)
  const t1 = useGLTF("/t1.glb")
  const t2 = useGLTF("/t2.glb")
  const t3 = useGLTF("/t3.glb")
  const t4 = useGLTF("/t4.glb")
  return (
    <div className="main">
      <div className="canv">
        <Canvas>
          <SceneCamera pos={pos} />
          <directionalLight position={[0, 10, -15]} intensity={3} />
          <Suspense fallback={<Loader />}>
            <Model />
            <group rotation={[0,1.3,0]} position={[-1.5,1.5,0.8]} ref={group}>
              <primitive onClick={async()=>{
                setpos([-1.5,1.5,-1]);
                const box = document.getElementById('button_box')
                const text1 = document.getElementById('text-1')
                const text2 = document.getElementById('text-2')
                const b1 = document.getElementById('ab')
                const b2 = document.getElementById('ab2')
                b1!.addEventListener('click', ()=> {
                  router.push('/1')
                })
                b2!.addEventListener('click', ()=> {
                  router.push('/1/test')
                })
                box!.style.visibility = 'visible'
                text1!.innerHTML='Петропавловская'
                text2!.innerHTML='Крепость'
              }} object={t1.scene} />
            </group>
            <group rotation={[0,1.6,0]} position={[-0.5,1.5,0.6]} ref={group}>
              <primitive onClick={async()=>{
                setpos([-0.5,1.5,-1])
                const box = document.getElementById('button_box')
                const text1 = document.getElementById('text-1')
                const text2 = document.getElementById('text-2')
                const b1 = document.getElementById('ab')
                const b2 = document.getElementById('ab2')
                b1!.addEventListener('click', ()=> {
                  router.push('/2')
                })
                b2!.addEventListener('click', ()=> {
                  router.push('/2/test')
                })
                box!.style.visibility = 'visible'
                text1!.innerHTML='Адмиралтейство'
                text2!.innerHTML=''
              }} object={t2.scene} />
            </group>
            <group rotation={[0,0,0]} position={[0.5,1.2,0.8]} ref={group}>
              <primitive onClick={async()=>{
                setpos([0.5,1.5,-1])
                const box = document.getElementById('button_box')
                const text1 = document.getElementById('text-1')
                const text2 = document.getElementById('text-2')
                const b1 = document.getElementById('ab')
                const b2 = document.getElementById('ab2')
                b1!.addEventListener('click', ()=> {
                  router.push('/3')
                })
                b2!.addEventListener('click', ()=> {
                  router.push('/3/test')
                })
                box!.style.visibility = 'visible'
                text1!.innerHTML='Домик'
                text2!.innerHTML='Петра'
              }} object={t3.scene} />
            </group>
            <group rotation={[0,1.7,0]} position={[1.6,1.29,0.8]} ref={group}>
              <primitive onClick={async()=>{
                setpos([1.6,1.5,-1])
                const box = document.getElementById('button_box')
                const text1 = document.getElementById('text-1')
                const text2 = document.getElementById('text-2')
                const b1 = document.getElementById('ab')
                const b2 = document.getElementById('ab2')
                b1!.addEventListener('click', ()=> {
                  router.push('/4')
                })
                b2!.addEventListener('click', ()=> {
                  router.push('/4/test')
                })
                box!.style.visibility = 'visible'
                console.log(text1,text2)
                text1!.innerHTML='Васильевский'
                text2!.innerHTML='Остров'
              }} object={t4.scene} />
            </group>
          </Suspense>
        </Canvas>
      </div>
      <div id='text'>
        <div id='text-1'>Выбери объект</div>
        <div id='text-2'></div>
      </div>
      <div id='button_box'>
        <button id="ab">Видео</button>
        <button id="ab2">Тест</button>
      </div>
    </div>
  )
}
