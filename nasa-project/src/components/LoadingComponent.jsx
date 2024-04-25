import React from 'react';
import backgroundL from '../img/backgroundL.mp4'

export default function LoadingComponent() {

    return (
        <div className='main'>
            <video src={backgroundL} autoPlay loop muted />
            <p className='descriptionL'>Sorry for the wait, we're preparing you for landing!</p>
        </div>
    );
}
