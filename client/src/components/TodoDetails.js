import React from "react";
import { deleteTodo } from "../redux/actions/todos";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';

export const TodoDetails = ({currentTodo, refreshData, worker, removeTodo}) => {

    return (
        <div className="col-md-4">
            {currentTodo ? (
                <div>
                    <h4>Todo Details</h4>
                    <div>
                        <label>
                            <strong>Note:</strong>
                        </label>
                        <pre>
                            {currentTodo?.note}
                        </pre>
                    </div>
                    <div>
                        <label>
                            <strong>When:</strong>
                        </label>
                        <pre>
                            {currentTodo?.when?.toString()}
                        </pre>
                    </div>
                    <div>
                        <label>
                            <strong>Status:</strong>
                        </label>
                        <pre>
                            {currentTodo?.active ? "Active" : "Done"}
                        </pre>
                    </div>
                    <hr/>
                    <Link
                        to={"/todos/" + currentTodo?._id}
                        className="badge badge-warning mr-3 p-2"
                    >
                        edit 🖋️
                    </Link>

                    <button className="badge badge-danger p-2"
                            onClick={() => removeTodo(currentTodo?._id)}>delete ✖️
                    </button>
                </div>
            ) : (
                <div>
                    <p>Click on a Todo...</p>
                </div>
            )}
        </div>
    );
};
