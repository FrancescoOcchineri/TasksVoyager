import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../action/task';
import { useSpring, animated } from 'react-spring';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { collectMarker } from '../action/markers';
import TutorialComponent from './TutorialComponent';
import TrophiesComponent from './TrophiesComponent';
import { updateRandomMarkers } from '../action/random';

export default function MapComponent({ roverPosition, basePosition, roverIcon, baseIcon }) {
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks);
    const markers = useSelector(state => state.markers);
    const randomMarkers = useSelector(state => state.randomMarkers);
    const [lastClickedMarker, setLastClickedMarker] = useState(null);

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    useEffect(() => {
        const map = mapRef.current;

        if (map) {
            const bounds = map.getBounds();
            const mapCenter = bounds.getCenter();

            if (!bounds.contains([roverPosition.lat, roverPosition.lng])) {
                const newCenter = [mapCenter.lat + (roverPosition.lat - mapCenter.lat), mapCenter.lng + (roverPosition.lng - mapCenter.lng)];
                map.panTo(newCenter);
            }
        }
    }, [roverPosition]);

    useEffect(() => {
        if (tasks.tasks) {
            const newMarkers = tasks.tasks.photos.slice(0, 100).map((task) => {
                const lat = basePosition.lat + (Math.random() - 0.5) * 169;
                const lng = basePosition.lng + (Math.random() - 0.5) * 360;
                return { task, lat, lng, iconUrl: task.img_src, popup: task.id, hidden: false };
            });
            dispatch(updateRandomMarkers(newMarkers));
        }
    }, [dispatch, tasks, basePosition]);

    const handleMarkerClick = (marker) => {
        if (!markers.includes(marker)) {
            dispatch(collectMarker([marker]));
        }
        dispatch(updateRandomMarkers(randomMarkers.map(m =>
            m === marker ? { ...m, hidden: true } : m
        )));
    };

    const springProps = useSpring({
        to: { lat: roverPosition.lat, lng: roverPosition.lng },
        config: { tension: 120, friction: 14 }
    });

    const customIcon = (url) => L.icon({
        iconUrl: url,
        iconSize: [38, 38],
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '6px solid white',
        className: 'custom-marker'
    });

    return (
        <MapContainer
            center={[0, 0]}
            zoom={7}
            minZoom={7}
            maxZoom={7}
            dragging={false}
            keyboard={false}
            zoomControl={false}
            attributionControl={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
            maxBounds={[
                [Math.min(...randomMarkers.map(marker => marker.lat)), Math.min(...randomMarkers.map(marker => marker.lng))],
                [Math.max(...randomMarkers.map(marker => marker.lat)), Math.max(...randomMarkers.map(marker => marker.lng))]
            ]}
            maxBoundsViscosity={1.0}
        >
            <TileLayer
                url="https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png"
                attribution='&copy; OpenPlanetaryMap'
            />
            <animated.div style={{ position: 'absolute', ...springProps }}>
                {randomMarkers.map((marker, index) => (
                    !marker.hidden &&
                    <Marker
                        key={index}
                        position={[marker.lat, marker.lng]}
                        icon={customIcon(marker.iconUrl)}
                        eventHandlers={{
                            click: () => handleMarkerClick(marker)
                        }}
                    >
                        <Popup>
                            {marker.popup}
                        </Popup>
                    </Marker>
                ))}
                <Marker position={[roverPosition.lat, roverPosition.lng]} icon={roverIcon}>
                    <Popup>Curiosity</Popup>
                </Marker>
                <Marker position={[basePosition.lat, basePosition.lng]} icon={baseIcon}>
                    <Popup>Base</Popup>
                </Marker>
            </animated.div>
            <div className='latLngContainer'>
                <p className='fs-6 fw-bold me-3 mt-auto'>Lat: {roverPosition.lat}</p>
                <p className='fs-6 fw-bold mt-auto'>Lng: {roverPosition.lng}</p>
            </div>
            <TutorialComponent />
            <TrophiesComponent />
        </MapContainer>
    );
}
