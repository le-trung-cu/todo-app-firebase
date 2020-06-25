import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { signOut } from '../../firebase/firebase.utils';

const Header = ({ currentUser }) => {
    return (
        <header>
            <nav className="navigation">
                <ul className="navigation__list">
                    <li className="navigation__item">
                        <Link className="navigation__link" to="/todo-app-firebase/">Day</Link>
                    </li>
                    <li className="navigation__item">
                        <a className="navigation__link navigation__link--disabled" href="#">Week</a>
                    </li>
                    <li className="navigation__item navigation__item--disabled">
                        <a className="navigation__link navigation__link--disabled" href="#">Month</a>
                    </li>
                    <li className="navigation__item navigation__item--disabled">
                        <a className="navigation__link navigation__link--disabled" href="#">Year</a>
                    </li>
                    <li className="navigation__item">
                        {
                            currentUser ? <a className="navigation__link" onClick={signOut}>Sign Out</a>
                                : <Link className="navigation__link" to="/todo-app-firebase/sign-in">Sign In</Link>
                        }

                    </li>
                </ul>
            </nav>
            {
                currentUser ? <h5 className="wellcome-message">Hi: {currentUser.displayName}</h5> : null
            }
        </header>
    );
};

export default Header;