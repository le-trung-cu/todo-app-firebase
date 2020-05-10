import React from 'react';
import './header.styles.scss';

const Header = () => {
    return (
        <header>
            <nav className="navigation">
                <ul className="navigation__list">
                    <li className="navigation__item">
                        <a className="navigation__link" href="">Day</a>
                    </li>
                    <li className="navigation__item">
                        <a className="navigation__link" href="">Week</a>
                    </li>
                    <li className="navigation__item">
                        <a className="navigation__link" href="">Month</a>
                    </li>
                    <li className="navigation__item">
                        <a className="navigation__link" href="">Year</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;