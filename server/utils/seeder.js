const User = require('../models/User');
const Todo = require('../models/Todo');
const {sleep} = require("../utils/utils");

exports.generateDummyTodos = async (req, res, next) => {

    for (let i = 1; i <= 5; i++) {

        const dt = new Date();
        dt.setSeconds(dt.getSeconds() + 15); // remind after 15 seconds

        const todo = new Todo({
            note: 'test note ' + i.toString(),
            when: dt,
            active: true
        });
        await todo.save((err) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    status: 400,
                    error: err
                });
            }
        });
        sleep(2000)
    }
    return res.status(200).json({
        status: 200,
        mgs: "Added"
    });
};

exports.removeAll = async (req, res, next) => {
    await Todo.remove({});
    return res.status(200).json({
        status: 200,
        mgs: "Removed"
    });
};