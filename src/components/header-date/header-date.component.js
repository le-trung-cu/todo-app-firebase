import React from 'react';
import './header-date.styles.scss';

const HeaderDate = () => {
    return (
        <div className="header-date">
            <div className="header-date__content">
                <h3 className="header-date__main">Thursday</h3>
                <p className="header-date__sub">Mar 23, 2017</p>
            </div>
            <i className="flaticon-left-arrow header-date__next-day"></i>
            <i className="flaticon-next header-date__prev-day"></i>
        </div>
    );
};

export default HeaderDate;