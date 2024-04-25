import React, { useState, useEffect, useRef } from 'react';
import LoadingComponent from './LoadingComponent';
import roverup from '../img/Roverup.png';
import roverdown from '../img/Roverdown.png';
import roverleft from '../img/Roverleft.png';
import roveright from '../img/Roveright.png';
import Base from '../img/Base.png';
import L from 'leaflet';
import RightBarComponent from '../components/RightBarComponent';
import TopBarComponent from './TopBarComponent';
import MapComponent from './MapComponent';

const RoverComponent = () => {
    const [roverPosition, setRoverPosition] = useState({ lat: 0, lng: 0 });
    const [basePosition, setBasePosition] = useState({ lat: 0, lng: 1 });
    const [roverImage, setRoverImage] = useState(roverup);
    const mapRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            let speed = 0.5;
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                speed = 0.5;
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                speed = 0.5;
            }

            let newLat = roverPosition.lat;
            let newLng = roverPosition.lng;

            switch (event.key) {
                case 'ArrowUp':
                    if (newLat + speed <= 84.5) {
                        newLat = roverPosition.lat + speed;
                        setRoverImage(roverup);
                    }
                    break;
                case 'ArrowDown':
                    if (newLat - speed >= -84.5) {
                        newLat = roverPosition.lat - speed;
                        setRoverImage(roverdown);
                    }
                    break;
                case 'ArrowLeft':
                    if (newLng - speed >= -177.5) {
                        newLng = roverPosition.lng - speed;
                        setRoverImage(roverleft);
                    }
                    break;
                case 'ArrowRight':
                    if (newLng + speed <= 177.5) {
                        newLng = roverPosition.lng + speed;
                        setRoverImage(roveright);
                    }
                    break;
                default:
                    break;
            }


            const map = mapRef.current;
            if (map) {
                const bounds = map.getBounds();

                if (!bounds.contains([newLat, newLng])) {
                    const newCenter = bounds.getCenter();
                    map.setView(newCenter);
                }
            }

            const distance = Math.sqrt(Math.pow(newLat - basePosition.lat, 2) + Math.pow(newLng - basePosition.lng, 2));
            const collision = 0.5;

            if (distance <= collision) {
                return;
            }

            setRoverPosition({ lat: newLat, lng: newLng });
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [roverPosition.lat, roverPosition.lng, basePosition.lat, basePosition.lng]);

    const roverIcon = L.icon({
        iconUrl: roverImage,
        iconSize: [50, 50],
        iconAnchor: [16, 16],
    });

    const baseIcon = L.icon({
        iconUrl: Base,
        iconSize: [100, 100],
        iconAnchor: [25, 25],
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            {loaded ? (
                <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex' }}>
                    <TopBarComponent />
                    <RightBarComponent style={{ flex: -100, width: '200px' }} />
                    <div style={{ flex: 1 }}>
                        <MapComponent
                            ref={mapRef}
                            roverPosition={roverPosition}
                            basePosition={basePosition}
                            roverIcon={roverIcon}
                            baseIcon={baseIcon}
                        />
                    </div>
                </div>
            ) : (
                <LoadingComponent />
            )}
        </>
    );
};

export default RoverComponent;
