import React, { useState } from 'react';
import CheckBox from '../checkbox/checkbox.component';
import './todo-item.styles.scss';
import TodoItemMenu from '../todo-item-menu/todo-item-menu.component';

const TodoItem = ({ task, handleCompleteTask, handlePinTask, handleDeleteTask }) => {

    const { isCompleted, isPin, title, description, id } = task;
    const [toggleMenuDropDown, setToggleMenuDropDown] = useState(false);

    const handleMenuDropDown = () => {
        setToggleMenuDropDown(!toggleMenuDropDown);
    }

    return (
        <li className="todo-item">
            {isPin? <i className="flaticon-outline todo-item__pin"/>:null }
            <CheckBox onChange={handleCompleteTask} isChecked={isCompleted}
                inputId={"taskId_" + id} inputName={"taskName_" + id} />
            <div className="todo-item__box">
                <h5 className="todo-item__main">{title}</h5>
                <p className="todo-item__sub">{description}</p>
            </div>
            <button className="flaticon-more todo-item__menu-btn" 
            onClick={handleMenuDropDown}></button>
            {
                toggleMenuDropDown ? <TodoItemMenu isPin={isPin} 
                    handlePinTask={handlePinTask}
                    handleDeleteTask={handleDeleteTask}/> : null
            }
        </li>
    );
};

export default TodoItem;