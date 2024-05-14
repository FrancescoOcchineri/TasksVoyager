import React from 'react'
import { useSelector } from 'react-redux'
import { MDBBadge } from 'mdb-react-ui-kit';

export default function () {

    const markers = useSelector(state => state.markers)
    const randomMarkers = useSelector(state => state.randomMarkers);

    const itemStyle = (marker) => {
        let style = {
            width: '70px',
            height: '70px',
            overflow: 'hidden',
            float: 'left',
            border: '4px solid #FFF',
            margin: '2rem 2rem',
            boxShadow: '0 8px 6px -6px black'
        };

        if (window.innerWidth >= 1024 && window.innerWidth <= 1600) {
            style.width = '50px';
            style.height = '50px';
            style.margin = '1rem 1rem';
        }

        if (marker.task.camera.full_name === 'Rear Hazard Avoidance Camera' || marker.task.camera.full_name === 'Front Hazard Avoidance Camera') {
            style.border = '4px solid #D2B353';
            style.animation = 'glow 2s linear infinite';
        }

        return style;
    }

    const boxStyle = (marker) => {
        let style = {
            width: '-webkit-min-content',
            width: '-moz-min-content',
            width: 'min-content',
            minWidth: '500px',
            position: 'relative',
            margin: '4% auto',
            padding: '10px 20px 10px 20px',
            backgroundColor: '#FFF',
            boxShadow: '0px 1px 26px -3px #777777',
            position: 'relative',
            zIndex: '2',
        }

        if (window.innerWidth >= 1024 && window.innerWidth <= 1600) {
            style.margin = '7% auto';
        }

        if (marker.task.camera.full_name === 'Rear Hazard Avoidance Camera' || marker.task.camera.full_name === 'Front Hazard Avoidance Camera') {
            style.backgroundColor = '#D2B353';
        }

        return style;
    }

    const badgeStyle = (marker) => {
        let style = {
            position: 'absolute',
            top: 30,
            right: 40,
            fontFamily: 'Press Start 2P, cursive',
            backgroundColor: '#FFD700',
            color: 'black',
            fontSize: '17px'
        }

        if (window.innerWidth >= 1024 && window.innerWidth <= 1600) {
            style.fontSize = '15px';
        }

        if (marker.task.camera.full_name === 'Rear Hazard Avoidance Camera' || marker.task.camera.full_name === 'Front Hazard Avoidance Camera') {
            style.backgroundColor = '#FFD700';
        } else {
            style.backgroundColor = '#34E36C'
        }

        return style;

    }

    return (
        <>
            <section id="gallery" style={{ position: 'absolute' }}>
                <h2 id='totalMarkers'>Photos: {markers.length}/{randomMarkers.length}</h2>
                {randomMarkers && (
                    randomMarkers.map((marker, index) => {
                        const isMarkerInMarkers = markers.some(m => m.iconUrl === marker.iconUrl);
                        return (
                            <section className='item' key={index} style={{ ...itemStyle(marker), filter: isMarkerInMarkers ? 'grayscale(0%)' : 'grayscale(100%)' }}>
                                <a href={isMarkerInMarkers ? `#img-${index}` : undefined}>
                                    <img id={`imgMarkers-${index}`} src={marker.iconUrl} alt={`Marker ${index + 1}`} />
                                </a>
                            </section>
                        );
                    })
                )}
            </section>
            {randomMarkers && (
                <div>
                    {randomMarkers.map((marker, index) => {
                        const isMarkerInMarkers = markers.some(m => m.iconUrl === marker.iconUrl);
                        if (isMarkerInMarkers) {
                            return (
                                <div className="lightbox" id={`img-${index}`} key={index}>
                                    <a className="close_out" href="#"></a>
                                    <div className="box" style={boxStyle(marker)}>
                                        <a className="close" href="#"><i className="fa-solid fa-circle-xmark text-danger" style={{ fontSize: '1.7rem' }}></i></a>
                                        <p className="title2">Photo id: {marker.popup}</p>
                                        <div className="content">
                                            <img src={marker.iconUrl} alt={`Marker ${index + 1}`} />
                                            {marker.task.camera.full_name === 'Rear Hazard Avoidance Camera' || marker.task.camera.full_name === 'Front Hazard Avoidance Camera' ? (
                                                <h3>
                                                    <MDBBadge pill color='warning' light style={badgeStyle(marker)} className='customBadge'>
                                                        Rare
                                                    </MDBBadge>
                                                </h3>
                                            ) : (
                                                <h3>
                                                    <MDBBadge pill color='success' light style={badgeStyle(marker)} className='customBadge'>
                                                        Common
                                                    </MDBBadge>
                                                </h3>
                                            )}
                                            <p className="desc">Camera: {marker.task.camera.full_name}, Sol: {marker.task.sol}, Earth Date: {marker.task.earth_date}, Rover: {marker.task.rover.name}, Launch Date: {marker.task.rover.launch_date}. <br /> Status: {marker.task.rover.status}.</p>
                                        </div>
                                        <a className="prev" href={`#img-${(index - 1 + markers.length) % markers.length}`}>Previous</a>
                                        <a className="next" href={`#img-${(index + 1) % markers.length}`}>Next</a>
                                        <div className="clear"></div>
                                    </div>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            )}
        </>
    );
}


