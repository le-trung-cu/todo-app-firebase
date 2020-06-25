import React, { Component } from 'react';
import HeaderDate from '../components/header-date/header-date.component';
import InputAddTask from '../components/input-add-task/input-add-task.component';
import TodoList from '../components/todo-list/todo-list.component';
import { addTask, tasksContext, auth, updateTask, deleteTask } from '../firebase/firebase.utils';

class PageDayTodo extends Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [], taskPins: [], dateQuery: '' };
        this.unSubscribe = null;
        this.unSubscribeTaskSnapshot = null;
    }

    componentDidMount() {
        this.unSubscribe = auth.onAuthStateChanged(async userFromProvider => {
            if (userFromProvider) {
                let taskDocs = await tasksContext()
                    .where('createdAt', '==', this.state.dateQuery)
                    .get();
                let tasks = [];
                for (let element of taskDocs.docs) {
                    tasks.push({ ...element.data(), id: element.id });
                }
                this.setState({ tasks: tasks.filter(t => t.isPin === false) });
                this.setState({ taskPins: tasks.filter(t => t.isPin === true) });
            }
        })
    }

    componentWillUnmount() {
        this.unSubscribe();
    }


    handleCompleteTask = async (task) => {
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

        await updateTask({...task,isCompleted: !task.isCompleted});
    }

    handleAddTask = async (task) => {
        let taskRef = await addTask(task);
        // let taskDoc = (await taskRef.get()).data();
        this.setState({ tasks: [{ ...task, id: taskRef.id }, ...this.state.tasks] });
    }

    handlePinTask = async (task) => {
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

        await updateTask({...task, isPin: !task.isPin})
    }

    handleDeleteTask = async (task) => {
        if (task.isPin) {
            let taskPins = this.state.taskPins.filter(item => item !== task);
            this.setState({ taskPins });
        } else {
            let tasks = this.state.tasks.filter(item => item !== task);
            this.setState({ tasks });
        }

        await deleteTask(task.id);
    }

    handleChangeDateQuery = async (dateQuery) => {
        if (auth.currentUser) {
            let taskDocs = await tasksContext()
                .where('createdAt', '==', dateQuery)
                .get();
            let tasks = [];
            for (let element of taskDocs.docs) {
                tasks.push({ ...element.data(), id: element.id });
            }
            this.setState({ tasks: tasks.filter(t => t.isPin === false) });
            this.setState({ taskPins: tasks.filter(t => t.isPin === true) });
        }
        this.setState({ dateQuery });
    }


    render() {

        return (
            <div>
                <main className="main">
                    <HeaderDate handleChangeDateQuery={this.handleChangeDateQuery} />
                    <InputAddTask handleAddTask={this.handleAddTask} dateQuery={this.state.dateQuery} />
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