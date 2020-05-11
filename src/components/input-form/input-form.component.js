import React from 'react';
import './input-form.styles.scss';

const InputForm = ({name, label, id, type}) => {
    return (
        <div className="input-form">
            <input placeholder={label} className="input-form__input" type={type} name={name} id={id} />
            <label className="input-form__label" htmlFor={id}>{label}</label>
        </div>
    );
};

export default InputForm;