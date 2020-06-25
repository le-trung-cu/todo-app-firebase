import React from 'react';
import './input-form.styles.scss';

const InputForm = ({name, label, id, ...props}) => {
    return (
        <div className="input-form">
            <input placeholder={label} className="input-form__input"
            name={name} id={id} 
                {...props}
                />
            <label className="input-form__label" htmlFor={id}>{label}</label>
        </div>
    );
};

export default InputForm;