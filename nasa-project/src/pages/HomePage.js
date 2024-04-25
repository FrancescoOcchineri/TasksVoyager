import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, OrbitControls } from '@react-three/drei';
import Mars from '../mars3d/Mars';
import BackgroundMars3dComponent from '../components/BackgroundMars3dComponent';

export default function HomePage() {
    const orbitControlsRef = useRef();

    return (
        <>
            <Canvas style={{ position: 'relative' }}>
                <ambientLight intensity={0.5} />
                <OrbitControls ref={orbitControlsRef} enableZoom={false} />
                <Suspense fallback={null}>
                    <Mars />
                </Suspense>
                <Environment preset='sunset' />
                <BackgroundMars3dComponent />
                <Html >
                    <h1 className='bit'>TasksVoyager</h1>
                </Html>
            </Canvas>
        </>
    );
}
