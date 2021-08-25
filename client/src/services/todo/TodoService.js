import http from "../http-instance";

const getAll = (page = 1, limit = 5) => {
    return http.get(`/todos?page=${page}&limit=${limit}`);
};

const get = id => {
    return http.get(`/todos/${id}`);
};

const findByNote = note => {
    return http.get(`/todos/search/?searchText=${note}`);
};

const create = data => {
    return http.post("/todos", data);
};

const update = (id, data) => {
    return http.post(`/todos/edit/${id}`, data);
};

const remove = id => {
    return http.post(`/todos/delete/${id}`);
};

const removeAll = () => {
    return http.delete(`/todos`);
};


const TodoService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByNote
};

export default TodoService;
