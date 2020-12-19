export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({
                type: 'LOGIN_SUCCESS'
            })
        }).catch((err) => {
            dispatch({
                type: 'LOGIN_ERROR',
                err
            })
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            console.log('sign out success')
            dispatch({
                type: 'SIGNOUT_SUCCESS'
            });
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            console.log(response);
            return firestore.collection('users').doc(response.user.uid).set({
                firstName: newUser.firstname,
                lastName: newUser.lastname,
                initials: newUser.firstname[0] + newUser.lastname[0]
            });
        }).then(() => {
            dispatch({
                type: 'SIGNUP_SUCCESS'
            })
        }).catch((err) => {
            dispatch({
                type: 'SIGNUP_ERROR',
                err
            })
        })
    }
}