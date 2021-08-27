import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    retrieveTodos,
    deleteTodo,
    findTodoByNote,
    updateTodo
} from "../redux/actions/todos";
import {Link} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import {toast} from 'react-toastify';
import {TodoDetails} from './TodoDetails';
import {Paginate} from './Paginate';

const INTERVAL = 2 * 1000; // 2 seconds

const TodosList = () => {

    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const [currentTodo, setCurrentTodo] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchNote, setSearchNote] = useState("");
    const [loading, setLoading] = useState(false);

    const [searchItems, setSearchItems] = useState([]);


    useEffect(() => {
        worker();
        setInterval(worker, INTERVAL);
    }, []);

    useEffect(() => {

        // ALERTING
        todos?.data?.docs?.forEach(todo => {
            console.log(new Date(todo.when), " | ", new Date().toISOString())
            if (new Date(todo.when) <= new Date() && todo.active) {
                // if (todo.when <= new Date()) {
                //     toast.info(`${todo.note}!!!`);
                if (confirm(`It's time for a new Task! want to remove it?\n\n${todo.note}`)) {
                    removeTodo(todo._id);
                } else {
                    // disable
                    markDone(todo);
                }
            }
        });

    }, [todos]);

    const worker = () => {
        dispatch(retrieveTodos(
            new URL(location.href).searchParams.get('page') || 1,
            new URL(location.href).searchParams.get('limit') || 3
        ));
    };

    const removeTodo = (id) => {
        dispatch(deleteTodo(id))
            .then(response => {
                refreshData();
                worker();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const markDone = async (todo) => {
        const data = {
            note: todo.note,
            when: todo.when,
            status: false
        };

        await dispatch(updateTodo(todo._id, data))
            .then(response => {
                settodo({...todo, active: status});
            })
            .catch(e => {
                console.log(e);
            });
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

    const onChangeSearchNote = e => {
        const searchNote = e.target.value;
        setSearchNote(searchNote);
    };

    const refreshData = () => {
        setCurrentTodo(null);
        setCurrentIndex(-1);
    };

    const setActiveTodo = (todo, index) => {
        setCurrentTodo(todo);
        setCurrentIndex(index);
    };

    const findByNote = async () => {

        if (!searchNote || searchNote.trim().length < 1) {
            setSearchItems([]);
            return;
        }


        dispatch(findTodoByNote(searchNote)).then(res => {
            // refreshData();
            // console.log(res);

            // let txt = res.map(i => '-> ' + i.note + "\n");
            // alert(`Found ${res?.length} items\n\n${txt}`)

            setSearchItems(res)
        })
    };


    return (
        <div className="list row">

            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchNote}
                        onChange={onChangeSearchNote}
                        onKeyDown={e => (e.key === 'Enter' || e.code == 13) && findByNote()}
                        autoFocus={true}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByNote}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {searchNote && searchItems.length > 0 &&
            <div className="col-md-8 my-5">Search: <ul> {searchItems.map(item => <li>{item.note}</li>)}</ul></div>}
            {loading ? <div className="col-md-8">
                    <h3>Loading items...</h3>
                </div> :
                <div className="col-md-8">
                    <h4>Todos List <small>(total: {todos?.data?.totalDocs})</small></h4>

                    <div className="container-flud my-3">
                        <button className="btn btn-sm btn-warning mr-2"
                                onClick={() => window.open("http://listmysolution.com:8000/seed", "_blank")}
                        >seed new 5 items
                        </button>
                        <button className="btn btn-sm btn-danger"
                                onClick={() => window.open("http://listmysolution.com:8000/rm-f", "_blank")}
                        >remove all
                        </button>
                        <br/><br/>
                        <span>
                            <span>time now:</span> <pre
                            className="text-center text-danger bg-white py-3">{new Date().toISOString()}</pre>
                        </span>
                    </div>

                    <ul className="list-group">
                        {todos &&
                        todos?.data?.docs?.map((todo, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveTodo(todo, index)}
                                key={index}
                            >
                                <span className="badge badge-info mr-2"> ~> </span> {todo.note}
                                <span className="float-right">{todo.active ? '|Active|' : '|Done|'}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            }

            <TodoDetails
                currentTodo={currentTodo}
                removeTodo={removeTodo}
                refreshData={refreshData}
                worker={worker}
            />


            <Paginate refreshData={refreshData} setLoading={setLoading}/>

        </div>

    );
};

export default TodosList;
