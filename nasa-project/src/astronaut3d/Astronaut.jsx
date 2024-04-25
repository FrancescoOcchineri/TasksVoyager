/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 astronaut.gltf 
Author: haefu (https://sketchfab.com/haefu)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/cute-astronaut-816bd786fe8b4559a009de6a95582003
Title: Cute Astronaut
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/astronaut.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.122}>
          <group name="e75203c17064471a80f45a957ee6d120fbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Astronaut" rotation={[2.109, 1.4, -2.577]} scale={[-25.732, -25.723, -31.878]} />
                <group name="Armature_Astronaut" position={[0, 0, 7.92]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <group name="Object_6">
                    <primitive object={nodes._rootJoint} />
                    <group name="Object_8" rotation={[-1.032, -1.4, 2.577]} scale={[-25.732, 25.723, 31.878]} />
                    <skinnedMesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials.Astronaut} skeleton={nodes.Object_9.skeleton} />
                    <skinnedMesh name="Object_10" geometry={nodes.Object_10.geometry} material={materials.visier} skeleton={nodes.Object_10.skeleton} />
                  </group>
                </group>
                <group name="Sun" rotation={[3.128, 0.773, -2.283]} scale={100}>
                  <group name="Object_65" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_66" />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/astronaut.gltf')