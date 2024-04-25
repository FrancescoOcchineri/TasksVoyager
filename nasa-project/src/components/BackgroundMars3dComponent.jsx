import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import space7 from '../img/space7.jpg';

export default function BackgroundMars3dComponent() {
    const meshRef = useRef();
    const [texture, setTexture] = useState(null);

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.load(
            space7,
            (texture) => {
                texture.minFilter = THREE.LinearFilter;
                texture.anisotropy = 16;
                setTexture(texture);
            },
            undefined,
            (error) => {
                console.error('Error loading texture:', error);
            }
        );
    }, []);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.0001;
        }
    });

    return (
        <mesh ref={meshRef} receiveShadow position={[0, 0, 0]}>
            <sphereGeometry args={[7, 32, 32]} />
            {texture && (
                <meshStandardMaterial map={texture} side={THREE.BackSide} />
            )}
        </mesh>
    );
}
