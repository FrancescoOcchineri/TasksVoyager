import React from 'react';
import backgroundAuth from '../img/backgroundAuth.mp4'
import LoginFormComponent from '../components/LoginFormComponent';

export default function Login() {
    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex' }}>
            <video src={backgroundAuth} loop autoPlay muted></video>
            <LoginFormComponent />
        </div>
    );
}
