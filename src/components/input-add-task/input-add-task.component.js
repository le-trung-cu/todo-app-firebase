import React, { useState } from 'react';
import './input-add-task.styles.scss';

const InputAddTask = ({handleAddTask}) => {
    const [taskTitle, setTaskTitle] = useState('');
    const handelAddTaskSubmit = (event) => {
        event.preventDefault();
        handleAddTask({title: taskTitle})
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