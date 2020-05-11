import React, { Component, useState, useEffect } from 'react';
import HeaderDate from '../components/header-date/header-date.component';
import InputAddTask from '../components/input-add-task/input-add-task.component';
import TodoList from '../components/todo-list/todo-list.component';
import { addTask, tasksContext, auth } from '../firebase/firebase.utils';

const PageDayTodo = () => {

    const [dateQuery, setDateQuery] = useState('');
    const [tasks, setTasks] = useState([]);
    const [taskPins, setTaskPins] = useState([]);

    useEffect(() => {
        return auth.onAuthStateChanged(async userFromProvider => {
            if (userFromProvider) {
                tasksContext()
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    let task = change.doc.data().task;
                        if (change.type === "added") {
                            task = { ...task, id: change.doc.id }
                            setTasks([...tasks, task]);
                        }
                        if (change.type === "modified") {
                            console.log("Modified city: ", change.doc.data());
                        }
                        if (change.type === "removed") {
                            console.log("Removed city: ", change.doc.data());
                        }
                        else {
                            setTasks([...tasks, task]);
                        }
                });
            });
            }
        })
         
    }, []);
    useEffect(() => {
        if (auth.currentUser) {
            console.log('./////////', dateQuery);
            return tasksContext()
                .where('task.createdAt', '==', dateQuery)
                .onSnapshot(snapshot => {
                    snapshot.docChanges().forEach(change => {
                        let task = change.doc.data().task;
                        if (change.type === "added") {
                            task = { ...task, id: change.doc.id }
                            setTasks([...tasks, task]);
                        }
                        if (change.type === "modified") {
                            console.log("Modified city: ", change.doc.data());
                        }
                        if (change.type === "removed") {
                            console.log("Removed city: ", change.doc.data());
                        }
                        else {
                            setTasks([...tasks, task]);
                        }
                        console.log('mmmmmmm ', task);
                    });
                });
        }
    }, [dateQuery])

    const handleCompleteTask = (task) => {
        const func = (item) => {
            if (item === task) {
                return { ...task, isCompleted: !task.isCompleted };
            }
            return item;
        };

        if (!task.isPin) {
            let tasks = tasks.map(func);
            setTasks({ tasks });
        }
        else {
            let taskPins = taskPins.map(func);
            setTaskPins({ taskPins });
        }
        console.log(task);


    }

    const handleAddTask = (task) => {
        addTask(task);
    }

    const handlePinTask = (task) => {

    }

    const handleDeleteTask = (task) => {

    }

    return (
        <div>
            <main className="main">
                <HeaderDate handleChangeDateQuery={setDateQuery} />
                <InputAddTask handleAddTask={handleAddTask} dateQuery={dateQuery} />
                <div className="todo">
                    <ul className="todo__list-pin"></ul>
                    <TodoList pinTask={true} tasks={taskPins}
                        handleCompleteTask={handleCompleteTask}
                        handlePinTask={handlePinTask}
                        handleDeleteTask={handleDeleteTask} />
                    <TodoList tasks={tasks}
                        handleCompleteTask={handleCompleteTask}
                        handlePinTask={handlePinTask}
                        handleDeleteTask={handleDeleteTask} />
                </div>
            </main>
        </div>
    );

};

export default PageDayTodo;