import React, { Component } from 'react';
import InputForm from '../input-form/input-form.component';
import './sign-in.styles.scss';
import { signInWithGoogle, signInWithEmailAndPassword } from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import ButtonSingInWithGoogle from '../button-sing-in-with-google/button-google-with-google.component';

class SignIn extends Component {
    constructor() {
        super();
        this.state = { email: '', password: '' };
    }

    handelInputChange = (e) => {
        const { name, value } = e.target;
        let state = {};
        state[name] = value;
        this.setState(state);
    }

    handleSignInSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        try {
            let { user } = await signInWithEmailAndPassword(email, password);

        } catch (e) {
            console.log(e);
        }
        this.setState({ email: '', password: '' });
    }
    render() {
        const { email, password } = this.state;
        return (
            <div className="sign-in">
                <h2 className="sign-in__heading">SIGN IN</h2>
                <form action="" onSubmit={this.handleSignInSubmit}>
                    <InputForm id="email"
                        name="email"
                        label="Email"
                        value={email}
                        required
                        minLength="6"
                        type="email"
                        onChange={this.handelInputChange} />
                    <InputForm type="password" id="password"
                        name="password"
                        label="Password"
                        minLength="2"
                        value={password}
                        required

                        onChange={this.handelInputChange} />
                    <div className="sign-in__row">
                        <button className="sign-in__btn">SIGN IN</button>
                        <Link className="link-color" to='/sign-up'>Sign up?</Link>
                    </div>
                </form>
                <ButtonSingInWithGoogle />
            </div>
        );
    }
};

export default SignIn;