import React, { useState } from 'react';
import useAuthContext from '../context/AuthContext.jsx';

export default function LoginFormComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { login, register, loginErrors = {}, registerErrors = {} } = useAuthContext();
    const handleLogin = async (event) => {
        event.preventDefault();
        login({ email, password });
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        register({ username, email, password })
    };

    return (
        <div className="wrapper">
            <div className="card-switch">
                <label className="switch">
                    <input type="checkbox" className="toggle" />
                    <span className="slider"></span>
                    <span className="card-side"></span>
                    <div className="flip-card__inner">
                        <div className="flip-card__front">
                            <div className="title">Log in</div>

                            <form className="flip-card__form" onSubmit={handleLogin}>
                                <input className="flip-card__input"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {loginErrors.email &&
                                    <div className="alert alert-danger errors" role="alert">
                                        {loginErrors.email[0]}
                                    </div>
                                }
                                <input className="flip-card__input"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {loginErrors.password &&
                                    <div className="alert alert-danger errors" role="alert">
                                        {loginErrors.password[0]}
                                    </div>
                                }
                                <button type='submit' className="flip-card__btn">Flight</button>
                            </form>
                        </div>
                        <div className="flip-card__back">
                            <div className="title">Sign Up</div>
                            <form className="flip-card__form" onSubmit={handleRegister}>
                                <input className="flip-card__input"
                                    name="username"
                                    placeholder="Username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {registerErrors.username &&
                                    <div className="alert alert-danger errors" role="alert">
                                        {registerErrors.username[0]}
                                    </div>
                                }
                                <input className="flip-card__input"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {registerErrors.email &&
                                    <div className="alert alert-danger errors" role="alert">
                                        {registerErrors.email[0]}
                                    </div>
                                }
                                <input
                                    className="flip-card__input"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {registerErrors.password &&
                                    <div className="alert alert-danger errors" role="alert">
                                        {registerErrors.password[0]}
                                    </div>
                                }
                                <button type='submit' className="flip-card__btn">Flight</button>
                            </form>

                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
}
