import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { signOut } from '../../firebase/firebase.utils';

const Header = ({currentUser}) => {
    console.log('curren user')
    console.log( currentUser)
    return (
        <header>
            <nav className="navigation">
                <ul className="navigation__list">
                    <li className="navigation__item">
                        <a className="navigation__link" href="">Day</a>
                    </li>
                    <li className="navigation__item">
                        <a className="navigation__link navigation__link--disabled" href="">Week</a>
                    </li>
                    <li className="navigation__item navigation__item--disabled">
                        <a className="navigation__link navigation__link--disabled" href="">Month</a>
                    </li>
                    <li className="navigation__item navigation__item--disabled">
                        <a className="navigation__link navigation__link--disabled" href="">Year</a>
                    </li>
                    <li className="navigation__item">
                        {
                            currentUser? <div className="navigation__link" onClick={signOut}>Sign Out</div>
                            :<Link className="navigation__link"  to="/sign-in">Sign In</Link>
                        }
                        
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;