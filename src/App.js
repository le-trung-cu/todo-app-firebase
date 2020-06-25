import React, { Component } from 'react';
import './app.styles.scss';
import Header from './components/header/header.component';

import PageDayTodo from './pages/page-day-todo.component';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './components/sign-in/sign-in.component';
import { createUserProfileDocument, auth } from './firebase/firebase.utils';
import SignUp from './components/sign-up/sign-up.component';


class App extends Component {
  constructor() {
    super();
    this.state = { currentUser: null }
    this.unSubscribe = null;
  }

  componentDidMount() {
    this.unSubscribe = auth.onAuthStateChanged(async userFromProvider => {
      if (userFromProvider) {
        let userRef = await createUserProfileDocument(userFromProvider);
        userRef.onSnapshot(snapshot => {
          console.log('current user change')
          let currentUser = {
            id: snapshot.id,
            ...snapshot.data()
          };
          this.setState({ currentUser });
        });

      } else {
        this.setState({ currentUser: null });
      }
    });
  }

  componentWillUnmount() {
    this.unSubscribe();
  }

  render() {
    console.log(this.state.currentUser)
    return (
      <BrowserRouter>
        <div className="app-wrap">
          <div className="app">
            <Header currentUser={this.state.currentUser} />
            <Switch>
              <Route exact path='/todo-app-firebase'>
                {!this.state.currentUser ? <Redirect to='/todo-app-firebase/sign-in' /> : null}
                <PageDayTodo />
              </Route>
              <Route exact path='/todo-app-firebase/sign-in'>
                {this.state.currentUser ? <Redirect to='/todo-app-firebase' /> : <SignIn />}
              </Route>
              <Route exact path='/todo-app-firebase/sign-up'>
                {this.state.currentUser ? <Redirect to='/todo-app-firebase' /> : <SignUp />}
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
