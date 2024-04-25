import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TasksMenu = ({ markers }) => {

    return (
        <div className='row'>
            {markers && markers.length > 0 ? (
                markers.map((marker, index) => (
                    <div className='col-2 g-3' key={index}>
                        <Link to={'/photos'}><img id={`imgMarkers-${index}`} src={marker.iconUrl} alt={`Marker ${index + 1}`} /></Link>
                    </div>
                ))
            ) : (
                <div className='col'>
                    <div className='d-flex flex-row align-items-center'>
                        <p className='notMarkers'>What are you waiting for? Mars awaits!</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TasksMenu;
