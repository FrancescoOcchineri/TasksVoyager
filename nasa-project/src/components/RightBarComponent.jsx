import React, { useState, useEffect } from 'react';
import { MDBAccordion, MDBAccordionItem, MDBBtn } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { collectMarker } from '../action/markers';
import TasksMenu from './TasksMenu';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AchievementsComponent from './AchievementsComponent';
import wMenu from '../img/wMenu.png'
import useAuthContext from '../context/AuthContext.jsx';

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const markers = useSelector(state => state.markers);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuthContext()


    useEffect(() => {
        if (!menuOpen && closing) {
            const timeoutId = setTimeout(() => {
                setClosing(false);
            }, 300);
            return () => clearTimeout(timeoutId);
        }
    }, [menuOpen, closing]);

    useEffect(() => {
        const handleKeyDown = (event) => {

            if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                setMenuOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(prevMenuOpen => !prevMenuOpen);
        setClosing(true);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleRefresh = () => {
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }

    const backHome = () => {
        navigate('/');
    }

    const menuStyle = {
        width: menuOpen ? '23rem' : '0rem',
        transition: 'width 0.3s ease',
        ...(window.innerWidth >= 1024 && window.innerWidth <= 1600 && {
            width: menuOpen ? '20rem' : '0rem',
        })
    };
    

    const accordionStyle = {
        marginTop: '3.4rem',
        width: '27rem',
        overflowY: 'auto',
        maxHeight: 'calc(80vh - 3.4rem)',
    };

    const accordionStyle2 = {
        width: '27rem',
        overflowY: 'auto',
        maxHeight: 'calc(80vh - 3.4rem)',
    };

    const buttonStyle = {
        position: 'absolute',
        top: '1.8rem',
        left: '1rem',
        zIndex: 1600,
        opacity: closing ? 1 : 1,
        transition: 'opacity 0.3s ease',
    };

    const buttonStyle2 = {
        position: 'fixed',
        top: '1.8rem',
        right: '1rem',
        zIndex: 1600,
    };

    const buttonStyle3 = {
        position: 'fixed',
        top: '1.8rem',
        left: '50%',
        zIndex: 1600,
    };

    return (
        <div style={{ position: 'relative', backgroundImage: `url(${wMenu})`, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: menuOpen ? '20px' : 0, zIndex: '10000000' }}>
            <button className="pushable"
                onClick={toggleMenu}
                style={buttonStyle}>
                <span className="front">
                    Menu
                </span>
            </button>
            <span class="d-inline-block" data-mdb-ripple-init data-mdb-popover-init data-mdb-trigger="hover" data-mdb-content="Disabled popover">
                <button className="pushable2"
                    onClick={handleRefresh}
                    style={buttonStyle2}
                >
                    <span className="front2">
                        Reset
                    </span>
                </button>
            </span>
            <button className="pushable3"
                onClick={backHome}
                style={buttonStyle3}>
                <span className="front3">
                    Home
                </span>
            </button>
            <div className='d-flex justify-content-start' style={menuStyle}>
                <MDBAccordion initialActive={-1} style={accordionStyle}>
                    <MDBAccordionItem collapseId={1} headerTitle='Collection' style={{ borderRadius: '0', border: 'none', fontFamily: 'Space Grotesk, sans-serif' }}>
                        <TasksMenu markers={markers} />
                    </MDBAccordionItem>
                </MDBAccordion>
            </div>
            <div className='d-flex justify-content-start' style={menuStyle}>
                <MDBAccordion initialActive={-1} style={accordionStyle2}>
                    <MDBAccordionItem collapseId={1} headerTitle='Achievements' style={{ borderRadius: '0', border: 'none', fontFamily: 'Space Grotesk, sans-serif', marginTop: '1.5rem' }}>
                        <AchievementsComponent />
                    </MDBAccordionItem>
                </MDBAccordion>
            </div>
            {menuOpen ? (
                <div className='d-flex' style={{ marginTop: '57rem', position: 'absolute' }}>
                    <img src={user.picture} alt='img profile' style={{ width: '2rem', height: '2rem', border: '1px solid white' }} />
                    <p id='menuProfileTxt' className='ms-2'>{user.username}</p>
                </div>
            ) : (
                null
            )}
            {location.pathname === '/photos' && (
                <Link to="/play">
                    <MDBBtn size='sm' className='mt-5' color='light' rippleColor='dark' style={{ display: menuOpen ? null : 'none' }} >
                        Back
                    </MDBBtn>
                </Link>
            )}
        </div >
    );
}

export default Menu;
