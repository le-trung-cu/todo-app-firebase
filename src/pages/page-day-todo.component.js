import React, { Component } from 'react';
import HeaderDate from '../components/header-date/header-date.component';
import InputAddTask from '../components/input-add-task/input-add-task.component';
import TodoList from '../components/todo-list/todo-list.component';
import { addTask, tasksContext, auth } from '../firebase/firebase.utils';

class PageDayTodo extends Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [], taskPins: [], dateQuery: '', firstFetch: true };
        this.unSubscribe = null;
        this.unSubscribeTaskSnapshot = null;
    }

    updateTasks = () => {
        this.unSubscribeTaskSnapshot = tasksContext()
            .where('task.createdAt', '==', this.state.dateQuery)
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    let task = change.doc.data().task;
                    if (change.type === "added") {
                        task = { ...task, id: change.doc.id }
                        this.setState({ tasks: [...this.state.tasks, task] });
                    }
                    if (change.type === "modified") {
                        console.log("Modified city: ", change.doc.data());
                    }
                    if (change.type === "removed") {
                        console.log("Removed city: ", change.doc.data());
                    }
                });
            });
    }

    componentDidMount() {
        this.unSubscribe = auth.onAuthStateChanged(async userFromProvider => {
            if (userFromProvider) {
                let taskDocs = await tasksContext()
                    .where('task.createdAt', '==', this.state.dateQuery)
                    .get();
                let tasks = [];
                for (let element of taskDocs.docs) {
                    tasks.push({ ...element.data().task, id: element.id });
                }
                this.setState({ tasks })
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (auth.currentUser) {

            if (prevState.dateQuery !== this.state.dateQuery || this.state.firstFetch) {
                console.log('componentDidUpdate')

                this.unSubscribe();
                if (this.unSubscribeTaskSnapshot) {
                    this.unSubscribeTaskSnapshot();
                }
                this.setState({ tasks: [] });
                this.updateTasks();
                this.setState({ firstFetch: false });
            }
        }
    }

    componentWillUnmount() {
        this.unSubscribe();
        this.unSubscribeTaskSnapshot();
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
        // this.setState({ tasks: [task, ...this.state.tasks] });
        addTask(task);
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
            let taskPins = this.state.taskPins.filter(item => item !== task);
            this.setState({ taskPins });
        } else {
            let tasks = this.state.tasks.filter(item => item !== task);
            this.setState({ tasks });
        }
    }

    handleChangeDateQuery = (dateQuery) => {
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