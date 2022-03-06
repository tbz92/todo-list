import React, {useEffect, useState} from 'react';
import {NotificationManager} from "react-notifications";
import moment from "moment"
import {genericNetworkError} from "../Utilities";


function TodoList({todos, setTodos}) {

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = () => {

        axios.get('/api/todos')
            .then(function (response) {
                setTodos(response.data.data);
                NotificationManager.success(response.data.message, 'Success!');
            })
            .catch(genericNetworkError);
    }


    const handleDelete = (todo) => {
        let confirmAction = confirm("Are you sure to delete this?");

        if (confirmAction) {
            axios.delete(`/api/todos/${todo.id}`)
                .then(function (response) {
                    let newTodo = todos.filter(item => item.id !== todo.id);
                    setTodos(newTodo);
                    NotificationManager.success(response.data.message, 'Success!');
                })
                .catch(function (error) {
                    NotificationManager.error(error.message, 'Error!');
                });
        }
    };

    return (
        <div>
            <div className="row mx-1 px-5 pb-3 w-80">
                <div className="col mx-auto">

                    {
                        todos.map(todo => <React.Fragment key={todo.id}>
                            <div className="row px-3 align-items-center todo-item rounded">
                                <div className="col-auto m-1 p-0 d-flex align-items-center">
                                    <h2 className="m-0 p-0">
                                        <i className="fa fa-check-square-o text-primary btn m-0 p-0"
                                           data-toggle="tooltip"
                                           data-placement="bottom"
                                        />
                                    </h2>
                                </div>
                                <div className="col px-1 m-1 d-flex align-items-center">
                                    <input type="text"
                                           className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3"
                                           readOnly
                                           value={todo.task}
                                           title={todo.task}
                                    />
                                    <label className="date-label my-2 text-black-50" style={{width: '100%'}}>
                                        {
                                            <React.Fragment>
                                                <strong>Deadline: </strong>
                                                {moment.utc(todo.deadline).local().format('LT, Do MMMM')}
                                            </React.Fragment>
                                        }
                                    </label>

                                    <h5 className="m-0 p-0 px-2">
                                        <i className="fa fa-trash-o text-danger btn m-0 p-0"
                                           data-toggle="tooltip"
                                           data-placement="bottom"
                                           title="Delete todo"
                                           onClick={() => handleDelete(todo)}
                                        />
                                    </h5>
                                </div>
                            </div>
                        </React.Fragment>)
                    }

                </div>
            </div>
        </div>
    );
}

export default TodoList;
