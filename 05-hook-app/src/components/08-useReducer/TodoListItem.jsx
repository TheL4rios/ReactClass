import React from 'react'

export const TodoListItem = ({ todo, index, handleDelete, handleToggle }) => {
    return (
        <li 
            className="list-group-item">
            <p onClick={() => handleToggle(todo.id)}
                className={ todo.done ? 'complete' : '' }>{ index + 1 }.- { todo.desc }</p>
            <button 
                onClick={() => handleDelete(todo.id)}
                className="btn btn-danger">
                Borrar
            </button>
        </li>
    )
}
