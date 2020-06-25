import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../input-form/input-form.component';
import { signUp, createUserProfileDocument } from '../../firebase/firebase.utils';
import ButtonSingInWithGoogle from '../button-sing-in-with-google/button-google-with-google.component';

class SignUp extends Component {

    constructor() {
        super();
        this.state = { signUpEmail: '', signUpPassword: '', displayName: '' };
    }

    handelInputChange = (e) => {
        const { name, value } = e.target;
        let state = {};
        state[name] = value;
        this.setState(state);
    }

    handleSignUpSubmit = async (e) => {
        e.preventDefault();
        const { signUpEmail, signUpPassword, displayName } = this.state;
        try {
            let { user } = await signUp(signUpEmail, signUpPassword);
            createUserProfileDocument(user, { displayName });
        } catch (e) {
            console.log(e);
        }
        this.setState({ signUpEmail: '', signUpPassword: '', displayName: '' });
    }

    render() {
        const { signUpEmail, signUpPassword, displayName } = this.state;
        return (
            <div className="sign-up sign-in">
                <h2 className="sign-in__heading">SIGN Up</h2>
                <form action="" onSubmit={this.handleSignUpSubmit}>
                    <InputForm id="signUpEmail" type="email" name="signUpEmail" label="Email"
                        type="email"
                        required
                        onChange={this.handelInputChange}
                        value={signUpEmail} />
                    <InputForm onChange={this.handelInputChange} type="password"
                        id="signUpPassword"
                        name="signUpPassword"
                        label="Password"
                        minLength="6"
                        required
                        value={signUpPassword}
                        onChange={this.handelInputChange} />
                    <InputForm onChange={this.handelInputChange} type="text"
                        id="displayName"
                        name="displayName"
                        label="Display Name"
                        minLength="2"
                        required
                        value={displayName}
                        onChange={this.handelInputChange} />
                    <div className="sign-in__row">
                        <button className="sign-in__btn">SIGN UP</button>
                        <Link className="link-color" to='/todo-app-firebase/sign-in'>Sign In?</Link>
                    </div>
                </form>
                <ButtonSingInWithGoogle />
            </div>
        );
    }
}

export default SignUp;