const axios = require('axios');
const User = require('../models/User');
const Todo = require('../models/Todo');
const {getParam} = require('../utils/utils');

/**
 * GET /Todos
 */
exports.getTodos = async (req, res) => {

    const offset = getParam(req, 'offset') || -1;
    const page = getParam(req, 'page') || 1;
    const limit = getParam(req, 'limit') || 3;

    console.log('offset', offset, 'limit', limit, 'page', page)
    const options = {
        page: page,
        // offset: offset,
        limit: limit,
        collation: {
            locale: 'en',
        },
    };

    return res.status(200).json({
        "data": await Todo.paginate({}, options, function (err, result) {
            return result;
            // result.docs
            // result.totalDocs = 100
            // result.limit = 10
            // result.page = 1
            // result.totalPages = 10
            // result.hasNextPage = true
            // result.nextPage = 2
            // result.hasPrevPage = false
            // result.prevPage = null
            // result.pagingCounter = 1
        })
    });

};

/**
 * GET /Todos/{id}
 */
exports.getTodo = async (req, res) => {
    const id = getParam(req, 'id');
    return res.status(200).json({
        "data": await Todo.findOne({_id: id}, function (err, result) {
            return result;
        })
    });
};

/**
 * POST /todos/create
 */
exports.createTodo = async (req, res, next) => {
    const note = getParam(req, 'note');
    const when = getParam(req, 'when');

    if (!note || note.trim().length < 1) {
        return res.status(400).json({"error": 'error empty note'});
        return;
    }
    if (new Date(when) < new Date()) {
        return res.status(400).json({"error": 'error invalid remind date'});
    }
    const todo = new Todo({
        note: note,
        when: when
    });
    return await todo.save((err) => {
        if (err) {
            return res.status(400).json({"error": 'DB error'});
        } else {
            return res.status(200).json({"msg": 'new todo added successfully', todo: todo});
        }
    });
};

/**
 * POST /todos/delete/{id}
 */
exports.deleteTodo = async (req, res, next) => {

    const id = getParam(req, 'id');

    console.log('param', id, req.params);

    return Todo.find({_id: id}, async (error, todo) => {
        if (error) {
            return res.status(400).json({"error": 'DB error'});
        }
        if (!todo) {
            return res.status(400).json({"error": 'todo is not found'});
        }
        return await Todo.deleteOne({_id: id}, (error) => {
            if (error) {
                return res.status(400).json({"error": 'DB error'});
            }
        }).then(() => {
            return res.status(200).json({"msg": 'Todo deleted successfully'});
        });
    });
};


/**
 * GET /Todos/search/?searchText={note}
 */
exports.searchTodo = async (req, res, next) => {

    const searchText = getParam(req, 'searchText');

    return Todo.find({"note": {'$regex': searchText}}, async (error, todo) => {
        if (error) {
            return res.status(400).json({"error": 'DB error'});
        }
        if (!todo) {
            return res.status(400).json({"error": 'todo is not found'});
        }
        return res.status(200).json({"data": todo});
    });

};

/**
 * POST /todos/edit/{id}
 */
exports.editTodo = async (req, res, next) => {

    const id = getParam(req, 'id');
    const when = getParam(req, 'when');
    const note = getParam(req, 'note');
    const active = getParam(req, 'status') == true;

    console.log(id, note, 'active', active, when);

    if (!note || note.trim().length < 1) {
        return res.status(400).json({"error": 'error empty note'});
        return;
    }

    if (new Date(when) < new Date() && active) {
        return res.status(400).json({"error": 'error invalid remind date'});
    }

    return await Todo.find({id: id}, async (error, todo) => {
        if (error) {
            return res.status(400).json({"error": 'DB error'});
        }
        if (!todo) {
            return res.status(400).json({"error": 'Todo is not found'});
        }
        return await Todo.updateOne({_id: id}, {$set: {note: note, when: when, active: active}}, (error) => {
            if (error) {
                return res.status(400).json({"error": 'DB error'});
            }
        }).then(() => {
            return res.status(200).json({"msg": 'Todo updated successfully'});
        });
    });
};