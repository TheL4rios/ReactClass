const initialState = [{
    id: 1,
    todo: 'Comprar',
    done: false
}];

const todoReducer = (state = initialState, action) => {

    if (action?.type == 'ADD') {
        return [...state, action.payload];
    }

    return state;
}

let todos = todoReducer();

const newTodo = {
    id: 2,
    todo: 'Hola',
    done: false
};

const action = {
    type: 'ADD',
    payload: newTodo
};

todos = todoReducer(todos, action);

console.log(todos);