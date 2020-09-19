import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './Header';
import Courses from './Courses';
import CourseDetail from './CourseDetail';
import UserSignIn from './UserSignIn';
import UserSignUp from './UserSignUp';

function App() {
  return (
    <Router>
      <div id="root">
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route path="/courses/:id" render={(props) => (<CourseDetail id={props.match.params.id} />)} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" component={UserSignUp} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
