import React, { useState } from 'react';
import './checkbox.styles.scss';

const CheckBox = ({ isChecked, onChange }) => {

    return (
        <div role="checkbox" className={`checkbox${isChecked ? ' checked' : ''}`}>
            <label className="checkbox__label" onClick={onChange}></label>
        </div>
    );
};

export default CheckBox;