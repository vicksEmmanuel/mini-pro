export const createProject = ( project ) => {
    console.log('Here is project', project);
    return  (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('project').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({
                type:'ÇREATE_PROJECT',
                project
            });
        }).catch((err) => {
            dispatch({
                type:'ÇREATE_PROJECT_ERROR',
                err
            });
        });
    }
};