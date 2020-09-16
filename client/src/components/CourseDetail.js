import React, { useState, useEffect } from 'react';

const CourseDetail = ({ id }) => {
  const [course, setCourse] = useState();

  useEffect(() => {
    const url = `http://localhost:5000/api/courses/${id}`;
  
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
  
    fetch(url, options)
      .then(response => response.json())
      .then(data => parseData(data));
  },[id]);

  const parseData = (data) => {
    const name = `${data.Owner.firstName} ${data.Owner.lastName}`;
    const materials = data.materialsNeeded.split('\n');
    
    setCourse({
      ...data,
      name,
      materials
    });
  }

  if (!course) {
    return <p>Loading ...</p>
  } else {
    return (
      // Remember to add button toolbar
      <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
                <p>By {course.name}</p>
              </div>
              <div className="course--description">
                {course.description}    
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{course.estimatedTime}</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                      {course.materials.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    
                  </li>
                </ul>
              </div>
            </div>
          </div>
    );
  }
};

export default CourseDetail;