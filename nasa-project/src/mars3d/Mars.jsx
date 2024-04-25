import React, { useRef, useState, Suspense } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import Rover from '../rover3d/Rover';
import Astronaut from '../astronaut3d/Astronaut';
import { useFrame } from '@react-three/fiber';
import useAuthContext from '../context/AuthContext.jsx';

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/mars.gltf');
  const { user } = useAuthContext();

  useFrame(() => {
    group.current.rotation.y += 0.0001;
  });

  const [clickedHotspot, setClickedHotspot] = useState(null);
  const navigate = useNavigate();

  const handleClick = (hotspotName) => {
    setClickedHotspot(hotspotName);
    navigate("/play");
  };

  const handleAstronautClick = () => {
    if (user) {
      navigate('/profile')
    } else {
      navigate("/login");
    }
  };

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-1.413, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="mars_1" rotation={[Math.PI, Math.PI / 2, 0]} scale={8}>
                <mesh
                  name="Object_4"
                  geometry={nodes.Object_4.geometry}
                  material={materials.mars}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
      <mesh
        position={[0, 0, 2.67]}
        onClick={() => handleClick('rover')}
        onPointerOver={(event) => event.stopPropagation()}
        style={{ cursor: 'pointer' }}
      >
        <group position={[0.2, 0.4, 0]}>
          <Html scaleFactor={10}>
            <div class="bubble grow left" style={{ width: '5.5rem' }}>Play</div>
          </Html>
        </group>
        <Suspense fallback={null}>
          <Rover scale={[0.6, 0.6, 0.6]} rotation={[1.5, Math.PI / 1, 0]} />
        </Suspense>
      </mesh>
      <mesh
        position={[-1.3, 1.3, 1.75]}
        onClick={handleAstronautClick}
        onPointerOver={(event) => event.stopPropagation()}
        style={{ cursor: 'pointer' }}
      >
        <group position={[-0.1, 0.55, 0]}>
          <Html scaleFactor={10}>
            <div class="bubble grow left" style={{ width: '5.5rem' }}>{user ? (user.username) : ('Login')}</div>
          </Html>
        </group>
        <Suspense fallback={null}>
          <Astronaut scale={[0.8, 0.8, 0.8]} rotation={[0.5, Math.PI / 10, 0.6]} />
        </Suspense>
      </mesh>
    </group>
  );
}


useGLTF.preload('/mars.gltf');
useGLTF.preload('/rover.gltf');
useGLTF.preload('/astronaut.gltf');
