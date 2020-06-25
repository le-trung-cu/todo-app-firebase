import React, { useState } from 'react';
import './input-add-task.styles.scss';

const InputAddTask = ({ handleAddTask, dateQuery }) => {

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handelAddTaskSubmit = (event) => {
        event.preventDefault();

        handleAddTask({
            createdAt: dateQuery,
            isCompleted: false,
            title: taskTitle,
            description: taskDescription,
            isPin: false
        });
        setTaskTitle('');
        setTaskDescription('');
    }
    return (
        <form onSubmit={handelAddTaskSubmit} className="input-add-task"
            name="taskForm">
            <i className="flaticon-sort input-add-task__icon"></i>
            <input className="input-add-task__input"
                name="taskTitle"
                type="text"
                placeholder="Add a task..."
                value={taskTitle}
                onChange={(event) => setTaskTitle(event.target.value)} />
            {
                (taskTitle || taskDescription) ?
                    <React.Fragment>
                        <textarea className="input-add-task__input input-add-task__input--description"
                            name="taskDescription"
                            type="text"
                            value={taskDescription}
                            placeholder="description"
                            onChange={event => setTaskDescription(event.target.value)} />
                        <button className="input-add-task__btn">Ok</button>
                    </React.Fragment>
                    : null
            }

        </form>
    );
};

export default InputAddTask;