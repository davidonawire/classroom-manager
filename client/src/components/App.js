import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Courses from './Courses';
import CourseDetail from './CourseDetail';

function App() {
  return (
    <Router>
      <div id="root">
        <div>
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route path="/courses/:id" render={(props) => (<CourseDetail id={props.match.params.id} />)} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
