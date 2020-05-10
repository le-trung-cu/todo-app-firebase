import React from 'react';
import TodoItem from '../todo-item/todo-item.component';
import './todo-list.styles.scss';

const TodoList = ({ pinTask, tasks, handleCompleteTask, handlePinTask,handleDeleteTask }) => {

    return (
        <ul className={`todo__list${pinTask?' todo__list--pin':''}`}>
            {
                tasks.map((item, index) => <TodoItem key={index} task={item}
                handleCompleteTask={() => handleCompleteTask(item)}
                handlePinTask={() => handlePinTask(item)}
                handleDeleteTask={() => handleDeleteTask(item)}/>)
            }
        </ul>
    );
};

export default TodoList;