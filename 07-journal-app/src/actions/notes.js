import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
        dispatch(activeNote(docRef.id, newNote));
        dispatch(addNewNote(docRef.id, newNote))
    }
}

export const activeNote = (_id, note) => ({
    type: types.noteActive,
    payload: {
        _id,
        ...note
    }
})

export const addNewNote = (_id, note) => ({
    type: types.notesAddNew,
    payload: {
        _id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = note => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore._id;

        await db.doc(`${ uid }/journal/notes/${ note._id }`).update(noteToFirestore);

        dispatch(refreshNote(note._id, noteToFirestore));
        Swal.fire('Saved', note.title, 'success');
    }
}

export const refreshNote = (_id, note) => ({
    type: types.noteUpdated,
    payload: {
        _id,
        note: {
            _id,
            ...note
        }
    }
}) 

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;
        dispatch(startSaveNote(activeNote));

        Swal.close();
    }
}

export const startDeleteNote = (_id) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ _id }`).delete();

        dispatch(deleteNote(_id));
    }
}

export const deleteNote = (_id) => ({
    type: types.noteDelete,
    payload: _id
})

export const noteLogout = () => ({
    type: types.notesLogoutClean
})