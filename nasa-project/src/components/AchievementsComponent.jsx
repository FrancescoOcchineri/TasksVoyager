import React from 'react';
import Achievements1 from '../img/Achievements1.png';
import Achievements2 from '../img/Achievements2.png';
import Achievements3 from '../img/Achievements3.png';
import Achievements4 from '../img/Achievements4.png';
import { useSelector } from 'react-redux';
import { MDBTooltip } from 'mdb-react-ui-kit';

export default function AchievementsComponent() {

    const markers = useSelector(state => state.markers);

    const getAchieve = (index) => {
        switch (index) {
            case 1:
                return markers && markers.length > 0 ? { opacity: '1' } : { opacity: '0.5' };
            case 2:
                return markers && markers.length > 24 ? { opacity: '1' } : { opacity: '0.5' };
            case 3:
                return markers && markers.length > 59 ? { opacity: '1' } : { opacity: '0.5' };
            case 4:
                return markers && markers.length > 99 ? { opacity: '1' } : { opacity: '0.5' };
            default:
                return { opacity: '0' };
        }
    }

    return (
        <div className='row'>
            <div className='col-2 g-3'>
                <img style={getAchieve(1)} className='imgAchievements' src={Achievements1} alt="Achievements 1" />
            </div>
            <div className='col-2 g-3'>
                <img style={getAchieve(2)} className='imgAchievements' src={Achievements2} alt="Achievements 2" />
            </div>
            <div className='col-2 g-3'>
                <img style={getAchieve(3)} className='imgAchievements' src={Achievements3} alt="Achievements 3" />
            </div>
            <div className='col-2 g-3'>
                <img style={getAchieve(4)} className='imgAchievements' src={Achievements4} alt="Achievements 4" />
            </div>
        </div>
    )
}
