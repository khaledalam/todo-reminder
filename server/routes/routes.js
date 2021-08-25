var express = require('express');
var router = express.Router();

/**
 * Controllers (route handlers).
 */

const todoController = require('../controllers/todo');
const seederDB = require('../utils/seeder');

/**
 * Primary app routes.
 */
router.get('/health', (req, res, next) => {
    res.status(200).json({
        status: 200,
        message: 'OK'
    });
});


// router.post('/login', userController.postLogin);
// router.get('/logout', userController.logout);
// router.post('/signup', userController.postSignup);

// TODOs
router.get('/todos/search', todoController.searchTodo);
router.get('/todos', todoController.getTodos);
router.get('/todos/:id', todoController.getTodo);
router.post('/todos', todoController.createTodo);
router.post('/todos/edit/:id', todoController.editTodo);
router.post('/todos/delete/:id', todoController.deleteTodo);

// Utils
router.get('/seed', seederDB.generateDummyTodos);
router.get('/rm-f', seederDB.removeAll);


module.exports = router;
