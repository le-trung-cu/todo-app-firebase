import React, { useState } from 'react';
import './input-add-task.styles.scss';

const InputAddTask = ({ handleAddTask, dateQuery }) => {

    const [taskTitle, setTaskTitle] = useState('');
    const handelAddTaskSubmit = (event) => {
        event.preventDefault();
        handleAddTask({
            createdAt: dateQuery,
            isCompleted: false,
            title: taskTitle,
            description: "one of my goals in 2017",
            isPin: false
        })
    }
    return (
        <form onSubmit={handelAddTaskSubmit} className="input-add-task"
            name="taskForm">
            <i className="flaticon-sort input-add-task__icon"></i>
            <input className="input-add-task__input"
                name="taskTitle"
                type="text"
                placeholder="Add a task..."
                onChange={(event) => setTaskTitle(event.target.value)} />
        </form>
    );
};

export default InputAddTask;