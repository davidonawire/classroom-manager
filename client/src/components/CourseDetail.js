import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

const CourseDetail = ({ id }) => {
  const [course, setCourse] = useState();
  const [isCourseOwner, setCourseOwner] = useState(false);
  const { authenticatedUser: authUser, data } = useContext(Context);

  useEffect(() => {
    const parseCourseData = (courseData) => {
      const name = `${courseData.Owner.firstName} ${courseData.Owner.lastName}`;
      const materials = courseData.materialsNeeded ? courseData.materialsNeeded.split('\n') : [];

      if (authUser) {
        setCourseOwner((courseData.userId === authUser.id));
      }
      
      setCourse({
        ...courseData,
        name,
        materials
      });
    }

    data.getCourses(id)
      .then(courseData => parseCourseData(courseData));
  },[id, data, authUser]);

 

  if (!course) {
    return <p>Loading ...</p>
  } else {
    return (
      <div>
        
          <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {isCourseOwner &&
                <span><Link className="button" to={'/courses/' + course.id + '/update'}>Update Course</Link>
                <Link className="button" href="#">Delete Course</Link></span>
              }
              <Link className="button button-secondary" to="/">Return to List</Link></div>
            </div>
          </div>
        
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
      </div>
    );
  }
};

export default CourseDetail;