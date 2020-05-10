import React from 'react';
import './todo-item-menu.styles.scss';

const TodoItemMenu = ({ isPin, handlePinTask, handleDeleteTask }) => {
    return (
        <ul className="todo-item-menu">
            <li className="todo-item-menu__item">
                <button href="" onClick={handlePinTask}>
                    <i className="flaticon-outline todo-item-menu__icon"></i>
                    <span className="todo-item-menu__text">{isPin ? "Unpin task" : "Pin on the top"}</span>
                </button>
            </li>
            <li className="todo-item-menu__item">
                <i className="flaticon-note-blank-paper-with-one-folded-corner todo-item-menu__icon"></i>
                <span className="todo-item-menu__text">Add a memo</span>
            </li>
            <li className="todo-item-menu__item">
                <button onClick={handleDeleteTask}>
                    <i className="flaticon-recycle-bin todo-item-menu__icon"></i>
                    <span className="todo-item-menu__text">Delete</span>
                </button>
            </li>
        </ul>
    );
};

export default TodoItemMenu;