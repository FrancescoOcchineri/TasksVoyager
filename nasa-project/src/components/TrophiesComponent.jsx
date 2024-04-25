import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Achievements1 from '../img/Achievements1.png';
import Achievements2 from '../img/Achievements2.png';
import Achievements3 from '../img/Achievements3.png';
import Achievements4 from '../img/Achievements4.png';

export default function TrophiesComponent() {
    const [showTrophie1, setShowTrophie1] = useState(false);
    const [showTrophie2, setShowTrophie2] = useState(false);
    const [showTrophie3, setShowTrophie3] = useState(false);
    const [showTrophie4, setShowTrophie4] = useState(false);
    const markers = useSelector(state => state.markers);

    useEffect(() => {
        const alreadyShown1 = JSON.parse(localStorage.getItem('trophyShown1'));
        const alreadyShown2 = JSON.parse(localStorage.getItem('trophyShown2'));
        const alreadyShown3 = JSON.parse(localStorage.getItem('trophyShown3'));
        const alreadyShown4 = JSON.parse(localStorage.getItem('trophyShown4'));

        if (!alreadyShown1 && markers.length === 1) {
            setShowTrophie1(true);
            localStorage.setItem('trophyShown1', JSON.stringify(true));
        } else if (!alreadyShown2 && markers.length === 25) {
            setShowTrophie2(true);
            localStorage.setItem('trophyShown2', JSON.stringify(true));
        } else if (!alreadyShown3 && markers.length === 50) {
            setShowTrophie3(true);
            localStorage.setItem('trophyShown3', JSON.stringify(true));
        } else if (!alreadyShown4 && markers.length === 100) {
            setShowTrophie4(true);
            localStorage.setItem('trophyShown4', JSON.stringify(true));
        }
    }, [markers]);

    // Pulisci i dati di localStorage al caricamento della pagina
    useEffect(() => {
        localStorage.removeItem('trophyShown1');
        localStorage.removeItem('trophyShown2');
        localStorage.removeItem('trophyShown3');
        localStorage.removeItem('trophyShown4');
    }, []);

    return (
        <div>
            {showTrophie1 && (
                <div className='trophie1'>
                    <div className='boxT1 d-flex align-items-center justify-content-center'>
                        <img className='imgTrophie' src={Achievements1} alt="Achievements 1" />
                        <div className='flex-column'>
                            <h6 className='titleT'>First Photo</h6>
                            <p className='descriptionT'>Take the first photo</p>
                        </div>
                    </div>
                </div>
            )}
            {showTrophie2 && (
                <div className='trophie1'>
                    <div className='boxT2 d-flex align-items-center justify-content-center'>
                        <img className='imgTrophie' src={Achievements2} alt="Achievements 2" />
                        <div className='flex-column'>
                            <h6 className='titleT'>25 Photos</h6>
                            <p className='descriptionT'>Take 25 photos</p>
                        </div>
                    </div>
                </div>
            )}
            {showTrophie3 && (
                <div className='trophie1'>
                    <div className='boxT3 d-flex align-items-center justify-content-center'>
                        <img className='imgTrophie' src={Achievements3} alt="Achievements 3" />
                        <div className='flex-column'>
                            <h6 className='titleT'>50 Photos</h6>
                            <p className='descriptionT'>Take 50 photos</p>
                        </div>
                    </div>
                </div>
            )}
            {showTrophie4 && (
                <div className='trophie1'>
                    <div className='boxT4 d-flex align-items-center justify-content-center'>
                        <img className='imgTrophie' src={Achievements4} alt="Achievements 4" />
                        <div className='flex-column'>
                            <h6 className='titleT'>100 Photos</h6>
                            <p className='descriptionT'>Take 100 photos</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
