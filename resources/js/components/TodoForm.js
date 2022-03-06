import React, {useState} from "react";
import DatePicker from "react-datepicker";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css";
import 'react-notifications/lib/notifications.css';
import TodoList from "./TodoList";
import {genericNetworkError} from "../Utilities";

function TodoForm() {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);
    const [deadlineDate, setDeadlineDate] = useState('');
    const [deadlineTime, setDeadlineTime] = useState('');
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [isTimeOpen, setIsTimeOpen] = useState(false);
    const [buttonDisabled, setIsButtonDisabled] = useState(true);

    const handleDateClick = (e) => {
        e.preventDefault();
        setIsDateOpen(!isDateOpen);
    };

    const handleDateChange = (e) => {
        setIsDateOpen(!isDateOpen);
        setDeadlineDate(e);
        checkButtonDisable();
    };

    const handleDateTimeRemove = (e) => {
        setDeadlineDate('');
        setDeadlineTime('');
        setIsButtonDisabled(true);
    };

    const handleTimeClick = (e) => {
        e.preventDefault();
        setIsTimeOpen(!isTimeOpen);
    };

    const handleTimeChange = (e) => {
        setIsTimeOpen(!isTimeOpen);
        setDeadlineTime(e);
        checkButtonDisable();
    };

    const checkButtonDisable = () => {
        setIsButtonDisabled(deadlineDate  === '' && deadlineTime === '')
    };

    const checkDateTimeFilled = () => deadlineDate !== '' && deadlineTime !== '';

    const getDeadlineDateTime = () => {
        let date = moment(deadlineDate).format('YYYY-MM-DD');
        let time = moment(deadlineTime).format('H:mm');
        return moment(date + ' ' + time).utc()
    }

    const clearFields = () => {
        setTask('');
        setDeadlineDate('');
        setDeadlineTime('');
        setIsButtonDisabled(true);
    };

    const handleSave = () => {
        axios.post('/api/todos', {
            task,
            deadline: getDeadlineDateTime()
        })
            .then(function (response) {
                NotificationManager.success(response.message, 'Success!');
                clearFields();
                setTodos(response.data.data)
            })
            .catch(genericNetworkError);
    }

    return (
        <div className="row m-1 p-3">
            <div className="col col-11 mx-auto">
                <div
                    className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                    <div className="col">
                        <input
                            className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                            type="text"
                            placeholder="Add new .."
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </div>
                    <div className="col-auto m-0 px-2 d-flex align-items-center">
                        {!checkDateTimeFilled() &&
                            (
                                <label className="text-secondary my-2 p-0 px-1 view-opt-label due-date-label">
                                    Due date not set
                                </label>
                            )
                        }
                        <i className="fa fa-calendar my-2 px-1 text-primary btn due-date-button"
                           data-toggle="tooltip"
                           data-placement="bottom"
                           title="Set a Due date"
                           onClick={handleDateClick}
                        />
                        <i className="fa fa-clock-o my-2 px-1 text-primary btn due-date-button"
                           data-toggle="tooltip"
                           data-placement="bottom"
                           title="Set time"
                           onClick={handleTimeClick}
                        />

                        {checkDateTimeFilled() &&
                            (
                                <i className="fa fa-calendar-times-o my-2 px-1 text-danger btn clear-due-date-button"
                                   data-toggle="tooltip"
                                   data-placement="bottom"
                                   title="Clear Due date"
                                   onClick={handleDateTimeRemove}
                                />
                            )
                        }

                    </div>
                    <div className="col-auto px-0 mx-0 mr-2">
                        <button
                            type="button"
                            className="btn btn-primary"
                            disabled={buttonDisabled}
                            onClick={handleSave}
                        >
                            Add
                        </button>
                    </div>
                </div>


                {isDateOpen && (
                    <div style={{float: 'right'}}>
                        <DatePicker
                            style={{float: 'right'}}
                            selected={deadlineDate}
                            inline
                            disabled={true}
                            onChange={handleDateChange}
                        />
                    </div>
                )}


                {isTimeOpen && (
                    <div style={{float: 'right'}}>
                        <DatePicker
                            selected={deadlineTime}
                            onChange={handleTimeChange}
                            showTimeSelect
                            inline
                            disabled={true}
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="H:mm"
                        />
                    </div>
                )}
                <NotificationContainer/>

            </div>

            <TodoList
                todos={todos}
                setTodos={setTodos}
            />
        </div>
    );
}

export default TodoForm;
