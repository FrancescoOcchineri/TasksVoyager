import React, { useState } from 'react'
import curiosity from '../img/curiosity.png';
import curiosityButton from '../img/curiosityButton.jpg';

export default function CuriosityCollectionComponent() {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [showTutorial, setShowTutorial] = useState(true);

    const tutorialTexts = [
        <div>
            <p>Did you know that the Curiosity rover is equipped with a total of 7 cameras? In order: FHAZ, NAVCAM, MAST, CHEMCAM, MAHLI, MARDI, and RHAZ.</p>
        </div>,
        <div>
            <p>FHAZ <cite title='Front Hazard Avoidance Camera'>"Front Hazard Avoidance Camera"</cite> <br /> HazCams detect hazards to the front and back pathways of the rover, such as large rocks, trenches, or sand dunes.</p>
        </div>,
        <div>
            <p>NAVCAM <cite title='Navigation Camera'>"Navigation Camera"</cite> <br /> Located up high on the rover's mast, these two cameras help engineers drive the rover around Mars.</p>
        </div>,
        <div>
            <p>MAST <cite title='Navigation Camera'>"Mast Camera"</cite> <br /> Takes color images and video, three-dimensional stereo images, and has a powerful zoom lens. Providing a 3-D view similar to human eyes.</p>
        </div>,
        <div>
            <p>CHEMCAM <cite title='Navigation Camera'>"Chemistry and Camera Complex"</cite> <br /> It takes pictures of sampled materials and the sample tubes as they are being prepared for sealing and caching.</p>
        </div>,
        <div>
            <p>MAHLI <cite title='Navigation Camera'>"Mars Hand Lens Imager"</cite> <br /> Microscopic Imaging of minerals, textures and structures in rocks and soil at scales smaller than the diameter of a human hair.</p>
        </div>,
        <div>
            <p>MARDI <cite title='Navigation Camera'>"Mars Descent Imager"</cite> <br />  It is a fixed-focus color camera. Took pictures during the spacecraft descent through the Martian atmosphere.</p>
        </div>,
        <div>
            <p>RHAZ <cite title='Navigation Camera'>"Rear Hazard Avoidance Camera"</cite> <br />  It's designed to provide a clear and detailed view of the terrain behind the rover as it moves across the Martian surface.</p>
        </div>,
    ];

    const handleNextButtonClick = () => {
        setCurrentTextIndex(currentTextIndex + 1);
    };

    const handleBackButtonClick = () => {
        setCurrentTextIndex(currentTextIndex - 1);
    };

    const handleSkipButtonClick = () => {
        setShowTutorial(false);
    };

    const handleEndButtonClick = () => {
        setShowTutorial(false);
    };

    const openCuriosity = () => {
        if (!showTutorial) {
            setShowTutorial(true)
        }
    }

    return (
        <>
            {showTutorial && (
                <div className='d-flex'>
                    <img className='curiosity' src={curiosity} alt='Astronaut Tutorial' />
                    <div className='dialogCuriosity'>
                        <div className='dialog-text'>
                            <p>{tutorialTexts[currentTextIndex]}</p>
                        </div>
                        <div className='control-buttons'>
                            {currentTextIndex < tutorialTexts.length - 1 && (
                                <button type="button" id='skipBC' className="btn btn-sm btn-danger" data-mdb-ripple-init onClick={handleSkipButtonClick}>Skip</button>
                            )}
                            {currentTextIndex > 0 && (
                                <button id='backB' type="button" className="btn btn-sm btn-dark" data-mdb-ripple-init onClick={handleBackButtonClick}>Back</button>
                            )}
                            {currentTextIndex < tutorialTexts.length - 1 && (
                                <button type="button" id='nextBC' className="btn btn-sm btn-dark" data-mdb-ripple-init onClick={handleNextButtonClick}>Next</button>
                            )}
                            {currentTextIndex === tutorialTexts.length - 1 && (
                                <button id='endB' type="button" className="btn btn-sm btn-dark" data-mdb-ripple-init onClick={handleEndButtonClick}>End</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {!showTutorial && (
                <a style={{ cursor: 'pointer' }} onClick={openCuriosity} ><img id='buttonCuriosity' src={curiosityButton} alt='Curiosity Cameras' style={{ width: '3.5rem' }} /></a>
            )}
        </>
    );
} 
