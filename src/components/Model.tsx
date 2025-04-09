import { useGLTF } from "@react-three/drei"
import { useRef } from "react"
import { Group } from "three"

useGLTF.preload("/wall.glb")

export default function Model() {
  const group = useRef<Group>(null)
  const { scene } = useGLTF("/wall.glb")
  return (
    <group rotation={[0,0,0]} position={[-0.5,-2,0]} ref={group}>
      <primitive object={scene} />
    </group>
  )
}
