import React, { useEffect, useState } from 'react';
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
      </div>
    )
  }

};

export default Courses;