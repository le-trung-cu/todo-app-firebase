import React, { Component } from 'react';
import './app.styles.scss';
import Header from './components/header/header.component';

import PageDayTodo from './pages/page-day-todo.component';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './components/sign-in/sign-in.component';
import { createUserProfileDocument, auth, tasksContext } from './firebase/firebase.utils';


class App extends Component {
  constructor() {
    super();
    this.state = { currentUser: null, dateQuery: ''}
    this.unSubscribe = null;
  }
  handleChangeDateQuery = (dateQuery) =>{
    console.log('.....sss', dateQuery)
    this.setState({dateQuery});
  }
  componentDidMount() {
    this.unSubscribe = auth.onAuthStateChanged(async userFromProvider => {
      if (userFromProvider) {
        let userRef = await createUserProfileDocument(userFromProvider);
        userRef.onSnapshot(snapshot => {
          let userProfile = snapshot.data();
          let currentUser = {
            id: userProfile.id,
            displayName: userProfile.displayName,
            email: userProfile.email
          }
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
    return (
      <BrowserRouter>
        <Switch>
          <div className="app-wrap">
            <div className="app">
              <Header currentUser={this.state.currentUser} />
              <Route exact path='/'>
                <PageDayTodo handleChangeDateQuery={this.handleChangeDateQuery} dateQuery={this.state.dateQuery}/>
              </Route>
              <Route exact path='/sign-in'>
                {this.state.currentUser ? <Redirect to='/' /> : <SignIn />}
              </Route>
            </div>
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
