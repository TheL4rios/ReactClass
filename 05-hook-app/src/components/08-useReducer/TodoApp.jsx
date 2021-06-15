import React, { useEffect, useReducer } from 'react'
import { useForm } from '../../hooks/useForm';
import './styles.css';
import { todoReducer } from './todoReducer';

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
    // return [{
    //     id: new Date().getTime(),
    //     desc: 'Aprender React',
    //     done: false
    // }];
}

export const TodoApp = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init);
    const [{ description }, handleInputChange, reset] = useForm({
        description: ''
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleDelete = (todoId) => {
        const action = {
            type: 'REMOVE',
            payload: todoId
        };

        dispatch(action);
    }

    const handleToggle = (todoId) => {
        dispatch({
            type: 'TOGGLE',
            payload: todoId
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (description.trim().length <= 1) {
            return;
        }

        const newTodo = {
            id: new Date().getTime(),
            desc: description,
            done: false
        };

        const action = {
            type: 'ADD',
            payload: newTodo
        };

        dispatch(action);
        reset();
    }

    return (
        <div>
            <h1>TodoApp ( { todos.length } )</h1>
            <hr/>

            <div className="row">
                <div className="col-7">
                    <ul className="list-group list-group-flush">
                        {
                            todos.map((todo, i) => (
                                <li 
                                    className="list-group-item" 
                                    key={todo.id}>
                                    <p onClick={() => handleToggle(todo.id)}
                                        className={ todo.done && 'complete' }>{ i + 1 }.- { todo.desc }</p>
                                    <button 
                                        onClick={() => handleDelete(todo.id)}
                                        className="btn btn-danger">
                                        Borrar
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-5">
                    <h4>Agregar TODO</h4>
                    <hr />
                    <form onSubmit={ handleSubmit }>
                        <input
                            onChange={ handleInputChange }
                            value={ description }
                            type="text"
                            name="description"
                            placeholder="Aprender..."
                            autoComplete="off"
                            className="form-control"
                        />

                        <button 
                            type="submit"
                            className="btn btn-outline-primary mt-1 btn-block">
                            Agregar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
