import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import BookShowPage from './components/BookShowPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/bookshow" component={BookShowPage} />
      </Switch>
    </Router>
  );
}

export default App;
