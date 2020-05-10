import React from 'react';
import logo from './logo.svg';
import './app.styles.scss';
import Header from './components/header/header.component';

import PageDayTodo from './pages/page-day-todo.component';

function App() {
  return (
    <div className="app-wrap">
      <div className="app">
        <Header />
        <PageDayTodo />
      </div>
    </div>
  );
}

export default App;
