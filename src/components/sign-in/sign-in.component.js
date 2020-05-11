import React from 'react';
import InputForm from '../input-form/input-form.component';
import './sign-in.styles.scss';
import { signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = () => {
    return (
        <div className="sign-in">
            <h2 className="sign-in__heading">SIGN IN</h2>
            <form action="">
                <InputForm id="userName" name="userName" label="User Name"/>
                <InputForm type="password" id="password" name="password" label="Password" />
                <div className="sign-in__row">
                    <button className="sign-in__btn">LOGIN</button>
                    <a>SIGN UP</a>
                </div>
            </form>
            <button onClick={signInWithGoogle} className="sign-in__btn sign-in__btn--google">Google</button>

        </div>
    );
};

export default SignIn;