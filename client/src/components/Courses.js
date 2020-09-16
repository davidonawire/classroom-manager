import React, { useEffect, useState } from 'react';
import Course from './Course';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:5000/api/courses'
  
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
  
    fetch(url, options)
      .then(response => response.json())
      .then(data => setCourses(data));
  },[]);

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

};

export default Courses;