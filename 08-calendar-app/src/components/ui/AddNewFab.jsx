import React from 'react'
import { useDispatch } from 'react-redux'
import { eventClearActiveEvent } from '../../actions/events';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(eventClearActiveEvent());
        dispatch(uiOpenModal());
    }

    return (
        <button onClick={ handleOpenModal } className="btn btn-primary fab">
            <i className="fas fa-plus"></i>
        </button>
    )
}
