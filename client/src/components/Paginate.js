import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { retrieveTodos } from "../redux/actions/todos";
import {Link} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import {toast} from 'react-toastify';
import {TodoDetails} from './TodoDetails';

export const Paginate = ({refreshData, setLoading}) => {

    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    // Pagination
    const [pagesCount, setPagesCount] = useState(1);
    const [page, setPage] = useState(
        new URL(location.href).searchParams.get('page') || 1
    );
    const [pageLimit, setPageLimit] = useState(
        new URL(location.href).searchParams.get('limit') || 3
    );

    useEffect(() => {
        setPagesCount(
            Math.round((todos?.data?.totalDocs + 1) / pageLimit)
        )

        todos?.data?.docs?.forEach(todo => {
            // console.log(todo.when, " | ", new Date().toISOString())
            if (todo.when <= new Date()) {
                toast.info(`${todo.note}!!!`);
                alert("Thank you!");
            }
        })
    }, [todos]);

    const handleChangePage = (e) => {
        window.history.replaceState(null, null, `?page=${e.selected + 1}`);
        setPage(e.selected + 1)
        refreshData();
        setLoading(true);
        dispatch(retrieveTodos(e.selected + 1, pageLimit)).then(() => {
            setTimeout(() => setLoading(false), 300);
        })
    }

    return (
        todos?.data?.totalDocs > 0 && <div className="container">
            <ReactPaginate
                previousLabel={'< previous'}
                nextLabel={'next >'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pagesCount}
                marginPagesDisplayed={pagesCount}
                pageRangeDisplayed={2}
                onPageChange={handleChangePage}
                containerClassName={'pagination'}
                activeClassName={'active'}
                disableInitialCallback={true}
            />
        </div>
    );
};
