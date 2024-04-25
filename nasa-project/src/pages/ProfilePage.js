import React from 'react'
import backgroundAuth from '../img/backgroundAuth.mp4'
import useAuthContext from '../context/AuthContext.jsx';

export default function ProfileComponent() {

    const { logout } = useAuthContext();
    const { user } = useAuthContext();

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex' }}>
            <video src={backgroundAuth} loop autoPlay muted></video>
            <div class="borderB pixelB">
                <div className='d-flex' style={{ position: 'absolute', left: '15%', top: '14%' }}>
                    <img style={{ width: '8rem', border: '3px solid white' }} src='https://static.vecteezy.com/system/resources/previews/004/829/263/non_2x/astronaut-in-pixel-art-style-vector.jpg' alt='img profile' />
                    <div>
                        <p className='text-light'>{user.username}</p>
                        <p className='text-light'>{user.email}</p>
                        <button className="pushable2" onClick={logout} style={{ position: 'absolute', top: '80%', left: '50%' }}><span className="front2">Logout</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
