import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../Data';
import Course from './Course';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses()
      .then(data => setCourses(data));
  },[]);

  if (courses === []) {
    return <p>Loading ...</p>
  } else {
    return (
      <div className="bounds">
        {courses.map( (course) => 
          <Course 
            key={course.id} 
            title={course.title}
            id={course.id}
          />
        )}
        <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
          <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Course</h3>
        </Link></div>
      </div>
    )
  }

};

export default Courses;