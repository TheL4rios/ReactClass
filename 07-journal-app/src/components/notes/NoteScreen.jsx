import React from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange] = useForm(note);

    const { title, body } = formValues;

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
                        <img src="https://es.rankiapro.com/wp-content/uploads/2019/08/fondo-tecnologico-preferido-selectores.jpg"
                            alt="iamgen"
                        />
                    </div>
                }
            </div>
        </div>
    )
}
