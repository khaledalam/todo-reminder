import {
    CREATE_TODO,
    RETRIEVE_TODOS,
    UPDATE_TODO,
    DELETE_TODO,
    SEARCH_TODO
} from "../actions/types";

const initialState = [];

const todoReducer = (todos = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case CREATE_TODO:
            return [...todos, payload];

        case RETRIEVE_TODOS:
            return payload;

        case UPDATE_TODO:
            return payload;

        case SEARCH_TODO:
            return payload;

        case DELETE_TODO:
            return todos?.data?.docs.filter(({id}) => id !== payload.id);

        default:
            return todos;
    }
};

export default todoReducer;