import React from 'react'
import backgroundAuth from '../img/backgroundAuth.mp4'
import useAuthContext from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function ProfileComponent() {

    const { logout } = useAuthContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const back = () => {
        navigate('/');
    }

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex' }}>
            <video src={backgroundAuth} loop autoPlay muted></video>
            <div class="borderB pixelB">
                <button className="pushableP" onClick={back} style={{ position: 'absolute', left: '2%', top: '5%' }}><span className="frontP">Back</span></button>
                <button className="pushable2" onClick={logout} style={{ position: 'absolute', right: '5%', bottom: '7%' }}><span className="front2">Logout</span></button>
                <div className='d-flex justify-content-between' style={{ position: 'absolute', left: '15%', top: '25%', width: '70%' }}>
                    <img style={{ width: '8rem', border: '3px solid white' }} src={user.picture} alt='img profile' />
                    <div id='profileTxt'>
                        <p className='text-light'><span>Username: </span><br /> {user.username}</p>
                        <p className='text-light'><span>Email: </span> {user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
