import React from 'react'
import { signInWithGoogle } from '../../firebase/firebase.utils';

const ButtonSingInWithGoogle = () => {
    return (
        <button onClick={signInWithGoogle} className="sign-in__btn sign-in__btn--google">Google</button>
    )
}

export default ButtonSingInWithGoogle
