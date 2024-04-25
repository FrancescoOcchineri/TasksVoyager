import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import backgroundP from '../img/backgroundP.mp4'
import { getTasks } from '../action/task';
import TopBarComponent from '../components/TopBarComponent';
import RightBarComponent from '../components/RightBarComponent';
import PhotosCollectionComponent from '../components/PhotosCollectionComponent';
import CuriosityCollectionComponent from '../components/CuriosityCollectionComponent';

export default function Collection() {

    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    return (
        <>
            <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex' }}>
                <TopBarComponent />
                <RightBarComponent style={{ flex: -100, width: '200px' }} />
                <CuriosityCollectionComponent />
                <video src={backgroundP} loop autoPlay muted></video>
                <PhotosCollectionComponent />
            </div>
        </>
    )
}
