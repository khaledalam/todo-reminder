import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {createTodo} from "../redux/actions/todos";
import DateTimePicker from 'react-datetime-picker';

const AddTodo = () => {
    const initialTodoState = {
        note: "",
        when: new Date()
    };
    const [todo, setTodo] = useState(initialTodoState);
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();

    const handleInputChange = event => {
        const {name, value} = event.target;
        setTodo({...todo, [name]: value});
    };

    const saveTodo = () => {
        const {note, when} = todo;

        if (!note || note.trim().length < 1) {
            alert('error empty note');
            return;
        }

        if (new Date(when) < new Date()) {
            alert('error invalid remind date');
            return;
        }

        dispatch(createTodo(note, when))
            .then(data => {
                setTodo({
                    note: data.note,
                    when: data.when,
                });
                setSubmitted(true);
                console.log(data);
            })
            .catch(e => {
                setSubmitted(true);
                console.log(e);
            });
    };

    const newTodo = () => {
        setTodo(initialTodoState);
        setSubmitted(false);
    };

    const handleChangeDatetime = newVal => {
        setTodo({...todo, when: new Date(newVal)})
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Todo added successfully!</h4>
                    <button className="btn btn-success" onClick={newTodo}>
                        Add another
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Note</label>
                        <textarea
                            required
                            rows="5"
                            className="form-control"
                            id="note"
                            required
                            value={todo.note}
                            onChange={handleInputChange}
                            name="note"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="when">Remind When</label>
                        <DateTimePicker
                            onChange={handleChangeDatetime}
                            value={todo.when}
                        />
                    </div>

                    <button onClick={saveTodo} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddTodo;
