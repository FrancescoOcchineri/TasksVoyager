import React, { useState } from 'react'
import tutorial from '../img/tutorial.png';

export default function TutorialComponent() {

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [showTutorial, setShowTutorial] = useState(true);

    const tutorialTexts = [
        <div>
            <p>Welcome, brave souls, to the surface of Mars! Behold the Red Planet in all its glory. The air is thin, the sky a dusty hue, but the possibilities are as boundless as the horizon stretching before us.</p>
        </div>,
        <div>
            <p>Your mission is simple: explore Mars and gather as much data as you can, collecting photos of points of interest.</p>
        </div>,
        <div className='d-flex'>
            <img id='imgTutorial' src="https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044630440503604I01_DXXX.jpg" alt="Photo example" />
            <p className='ms-3'>This is a point of interest! You'll find them all around the world. Just click it, and you'll collect it in the 'Collection' section within the Menu button.</p>
        </div>,
        <div>
            <p>In the menu, you will also find an 'Achievements' section, where you can check the goals to achieve on this fantastic planet!</p>
        </div>
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

    return (
        showTutorial && (
            <div className='d-flex'>
                <img className='tutorial' src={tutorial} alt='Astronaut Tutorial' />
                <div className='dialog'>
                    <div className='dialog-text'>
                        <p>{tutorialTexts[currentTextIndex]}</p>
                    </div>
                    <div className='control-buttons'>
                        {currentTextIndex < tutorialTexts.length - 1 && (
                            <button type="button" className="btn btn-sm btn-danger" data-mdb-ripple-init onClick={handleSkipButtonClick}>Skip Tutorial</button>
                        )}
                        {currentTextIndex > 0 && (
                            <button id='backB' type="button" className="btn btn-sm btn-dark" data-mdb-ripple-init onClick={handleBackButtonClick}>Back</button>
                        )}
                        {currentTextIndex < tutorialTexts.length - 1 && (
                            <button type="button" className="btn btn-sm btn-dark" data-mdb-ripple-init onClick={handleNextButtonClick}>Next</button>
                        )}
                        {currentTextIndex === tutorialTexts.length - 1 && (
                            <button id='endB' type="button" className="btn btn-sm btn-dark" data-mdb-ripple-init onClick={handleEndButtonClick}>End</button>
                        )}

                    </div>
                </div>
            </div>
        )
    )
}
