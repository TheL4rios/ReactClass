import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import validator from "validator";
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);

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
            dispatch(startRegisterWithEmailPassword(email, password, name));
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Name is required'));
            return false;
        }

        if (!validator.isEmail(email)) {
            dispatch(setError('Email is invalid'));
            return false;
        }

        if (password !== password2 || password.length < 5) {
            dispatch(setError('Password should be at least 6 characters and match each other'));
            return false;
        }

        dispatch(removeError());

        return true;
    }

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            <h3 className="auth__title">Register</h3>
            <form onSubmit={ handleRegister }>

                {
                    msgError &&
                    <div className="auth__alert-error">
                        { msgError }
                    </div>
                }

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
        </div>
    )
}
