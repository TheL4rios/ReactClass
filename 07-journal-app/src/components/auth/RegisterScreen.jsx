import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import validator from "validator";

export const RegisterScreen = () => {

    const [formValue, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formValue;

    const handleRegister = e => {
        e.preventDefault();
        if (isFormValid()) {

        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            return false;
        }

        if (!validator.isEmail(email)) {
            return false;
        }

        if (password !== password2 || password.length < 5) {
            return false;
        }

        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={ handleRegister }>

                <div className="auth__alert-error">
                    xd
                </div>

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    autoComplete="off"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    autoComplete="off"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button className="btn btn-primary btn-block mt-5 mb-5" type="submit">
                    Register
                </button>

                <Link className="link" to="/auth/login">
                    Already registered?
                </Link>
            </form>
        </>
    )
}
