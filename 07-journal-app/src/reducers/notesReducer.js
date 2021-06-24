import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
};

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.noteActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            };
        case types.notesAddNew:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            };
        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            };
        case types.noteUpdated:
            return {
                ...state,
                notes: state.notes.map(
                    note => note._id === action.payload._id ?
                        action.payload.note :
                        note
                )
            };
        case types.noteDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => note._id !== action.payload)
            };
        case types.notesLogoutClean:
            return {
                ...state,
                active: null,
                notes: []
            };
        default:
            return state;
    }
}