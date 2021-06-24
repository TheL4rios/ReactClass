import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleteNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const { _id,title, body } = formValues;

    const activeId = useRef(note._id);

    useEffect(() => {
        if (note._id !== activeId.current) {
            reset(note);
            activeId.current = note._id;
        }
    }, [note, reset])

    useEffect(() => {
        dispatch(activeNote(formValues._id, { ...formValues }));
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch(startDeleteNote(_id));
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                    placeholder="Some awesome title"
                    className="notes__title-input"
                />

                <textarea
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                    placeholder="What happened today"
                    className="notes__textarea"
                ></textarea>

                {
                    note.url &&
                    <div className="notes__images">
                        <img src={ note.url }
                            alt="iamgen"
                        />
                    </div>
                }
            </div>

            <button className="btn btn-danger" onClick={ handleDelete }>
                Delete
            </button>
        </div>
    )
}
