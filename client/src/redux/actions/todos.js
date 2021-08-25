import {
    CREATE_TODO,
    RETRIEVE_TODOS,
    UPDATE_TODO,
    DELETE_TODO,
    SEARCH_TODO
} from "./types";

import TodoDataService from "../../services/todo/TodoService";

export const createTodo = (note, when) => async (dispatch) => {
    try {
        const res = await TodoDataService.create({note, when});

        dispatch({
            type: CREATE_TODO,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveTodos = (page = 1, limit = 5) => async (dispatch) => {
    try {
        const res = await TodoDataService.getAll(page, limit);

        dispatch({
            type: RETRIEVE_TODOS,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
    }
};

export const updateTodo = (id, data) => async (dispatch) => {
    try {
        const res = await TodoDataService.update(id, data);

        dispatch({
            type: UPDATE_TODO,
            payload: data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteTodo = (id) => async (dispatch) => {
    try {
        await TodoDataService.remove(id);

        dispatch({
            type: DELETE_TODO,
            payload: {id},
        });
    } catch (err) {
        console.log(err);
    }
};

export const findTodoByNote = (note) => async (dispatch) => {
    try {
        const res = await TodoDataService.findByNote(note);

        dispatch({
            type: SEARCH_TODO,
            payload: res?.data?.data,
        });
        return Promise.resolve(res?.data?.data);
    } catch (err) {
        console.log(err);
    }
};
