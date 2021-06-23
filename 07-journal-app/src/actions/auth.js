import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => { //dispatch lo otorga thunk

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            }).catch(err => {
                dispatch(finishLoading());
                Swal.fire('Error', err.message, 'error');
                console.log(err);
            });
    }
}

export const startRegisterWithEmailPassword = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({
                    displayName: name
                });
                dispatch(login(user.uid, user.displayName));
            }).catch(err => {
                console.log(err);
                Swal.fire('Error', err.message, 'error');
            });
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
            });
    };
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
    };
}

export const logout = () => ({
    type: types.logout
})