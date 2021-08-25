import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import TodosList from "./components/TodosList";

function App() {
    return (
        <Router>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/todos" className="navbar-brand">
                    Todo reminder
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/todos"} className="nav-link">
                            List
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add new TODO
                        </Link>
                    </li>
                </div>
            </nav>

            <ToastContainer/>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/todos"]} component={TodosList}/>
                    <Route exact path="/add" component={AddTodo}/>
                    <Route path="/todos/:id" component={Todo}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
