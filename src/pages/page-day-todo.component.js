import React, { Component } from 'react';
import HeaderDate from '../components/header-date/header-date.component';
import InputAddTask from '../components/input-add-task/input-add-task.component';
import TodoList from '../components/todo-list/todo-list.component';

const todosInit = [{
    id: 1,
    isCompleted: false,
    title: 'Getting an invite for',
    description: "one of my goals in 2017",
    isPin: false
},
{
    id: 2,
    isCompleted: true,
    title: 'Getting an invite for',
    description: "one of my goals in 2017",
    isPin: false
},
{
    id: 3,
    isCompleted: true,
    title: 'Getting an invite for',
    description: "one of my goals in 2017",
    isPin: false
}];

class PageDayTodo extends Component {
    constructor() {
        super();
        this.state = { tasks: todosInit, taskPins: [] };
    }

    handleCompleteTask = (task) => {
        const func = (item) => {
            if (item === task) {
                return { ...task, isCompleted: !task.isCompleted };
            }
            return item;
        };

        if (!task.isPin) {
            let tasks = this.state.tasks.map(func);
            this.setState({ tasks });
        }
        else {
            let taskPins = this.state.taskPins.map(func);
            this.setState({ taskPins });
        }
        console.log(task);


    }

    handleAddTask = (task) => {
        this.setState({ tasks: [task, ...this.state.tasks] });
    }

    handlePinTask = (task) => {
        console.log('handle pink task')
        // if task is Pin toggle that
        if (task.isPin) {
            let taskPins = this.state.taskPins.filter(item => item !== task);
            this.setState({ taskPins });
            this.setState({ tasks: [{ ...task, isPin: !task.isPin }, ...this.state.tasks] })
        } else {
            let tasks = this.state.tasks.filter(item => item !== task);
            this.setState({ tasks });
            this.setState({ taskPins: [{ ...task, isPin: !task.isPin }, ...this.state.taskPins] });
        }
    }

    handleDeleteTask = (task) => {
        console.log('handle delete task');
        if (task.isPin) {
            let taskPins = this.state.taskPins.filter(item => item != task);
            this.setState({ taskPins });
        } else {
            let tasks = this.state.tasks.filter(item => item != task);
            this.setState({ tasks });
        }
    }


    render() {
        return (
            <div>
                <main className="main">
                    <HeaderDate />
                    <InputAddTask handleAddTask={this.handleAddTask} />
                    <div className="todo">
                        <ul className="todo__list-pin"></ul>
                        <TodoList pinTask={true} tasks={this.state.taskPins}
                            handleCompleteTask={this.handleCompleteTask}
                            handlePinTask={this.handlePinTask}
                            handleDeleteTask={this.handleDeleteTask} />
                        <TodoList tasks={this.state.tasks}
                            handleCompleteTask={this.handleCompleteTask}
                            handlePinTask={this.handlePinTask}
                            handleDeleteTask={this.handleDeleteTask} />
                    </div>
                </main>
            </div>
        );
    }

};

export default PageDayTodo;