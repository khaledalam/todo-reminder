import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {updateTodo, deleteTodo} from "../redux/actions/todos";
import TodoDataService from "../services/todo/TodoService";
import DateTimePicker from 'react-datetime-picker';

const Todo = (props) => {
    const initialTodoState = {
        _id: "",
        note: "",
        when: new Date(),
        active: true
    };
    const [todo, settodo] = useState(initialTodoState);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getTodo = id => {
        TodoDataService.get(id)
            .then(response => {
                console.log(response.data.data);
                settodo(response.data.data);
            })
            .catch(e => {
                console.log(e);
                alert('Error')
            });
    };

    useEffect(() => {
        getTodo(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const {name, value} = event.target;
        settodo({...todo, [name]: value});
    };

    const updateStatus = status => {
        const data = {
            note: todo.note,
            when: todo.when,
            status: status
        };

        dispatch(updateTodo(todo._id, data))
            .then(response => {
                console.log(response);
                settodo({...todo, active: status});
                setMessage("The status was updated successfully!");
            })
            .catch(e => {
                console.log(e);
                alert('error, make sure note and remind time are correct')
            });
    };

    const handleChangeDatetime = newVal => {

        settodo({...todo, when: new Date(newVal)})
    };

    const updateContent = () => {
        dispatch(updateTodo(todo._id, todo))
            .then(response => {
                console.log('sfas', response);
                setMessage(response.msg);

            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeTodo = () => {
        dispatch(deleteTodo(todo._id))
            .then(() => {
                props.history.push("/todos");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {todo ? (
                <div className="edit-form">
                    <h4>Todo</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Note</label>
                            <textarea
                                rows="5"
                                className="form-control"
                                id="note"
                                required
                                value={todo.note || ""}
                                onChange={handleInputChange}
                                name="note"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="when">Remind When</label>
                            <DateTimePicker
                                onChange={handleChangeDatetime}
                                value={new Date(todo.when)}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {todo.active ? " Active" : " Done"}
                        </div>
                    </form>

                    {todo.active ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateStatus(false)}
                        >
                            Mark Done
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateStatus(true)}
                        >
                            Active
                        </button>
                    )}

                    <button className="badge badge-danger mr-2" onClick={removeTodo}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateContent}
                    >
                        Update
                    </button>
                    <hr/>
                    {message}
                </div>
            ) : (
                <div>
                    <br/>
                    <p>Please click on a Todo...</p>
                </div>
            )}
        </div>
    );
};

export default Todo;
