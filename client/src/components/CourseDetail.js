import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

const CourseDetail = (props) => {
  const [course, setCourse] = useState();
  const [isCourseOwner, setCourseOwner] = useState(false);
  const { authenticatedUser: authUser, data } = useContext(Context);

  const courseId = props.match.params.id;

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

    data.getCourses(courseId)
      .then(courseData => parseCourseData(courseData));
  },[courseId, data, authUser]);

  const handleDelete = () => {
    data.deleteCourse(courseId, authUser.emailAddress, authUser.password)
      .then(status => {
        if (status === 401) {
          props.history.push('/forbidden');
        } else if (status === 204) {
          props.history.push('/');
        }
      })
      .catch(err => {
        console.log(err);
        props.history.push('/error');
      });
  }

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
                <button className="button" onClick={handleDelete}>Delete Course</button></span>
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