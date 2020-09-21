import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../Context';
import InlineErrors from './InlineErrors';

const UpdateCourse = (props) => {
  const { authenticatedUser: authUser, data } = useContext(Context);

  const [courseLoaded, setLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [isCourseOwner, setCourseOwner] = useState(false);

  const [errors, setErrors] = useState([]);

  const courseId = props.match.params.id;

  useEffect(() => {
    data.getCourses(courseId)
      .then(courseData => {
        setTitle(courseData.title);
        setDescription(courseData.description);
        setEstTime(courseData.estimatedTime);
        setMaterialsNeeded(courseData.materialsNeeded);
        setCourseOwner((courseData.userId === authUser.id));
        setLoaded(true);
      });
  },[courseId, data, authUser.id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id
    }

    data.updateCourse(courseId, course, authUser.emailAddress, authUser.password)
      .then(errors => {
        if (errors[0] === 401) {
          props.history.push('/forbidden');
        } else if (errors.length) {
          setErrors(errors);
        } else {
          props.history.push('/');
        }
      })
      .catch(err => {
        console.log(err);
        props.history.push('/error');
      });
  }

  const handleCancel = (event) => {
    event.preventDefault();
    props.history.push('/courses/' + courseId);
  }

  if (!courseLoaded) {
    return <p>Loading ...</p>
  } else if (!isCourseOwner) {
    return <Redirect to="/forbidden" />
  } else {
    return (
      <div className="bounds course--detail">
          <h1>Update Course</h1>
          <div>
            <InlineErrors errors={errors} />
            <form onSubmit={handleSubmit}>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                      value={title} onChange={e => setTitle(e.target.value)} /></div>
                  <p>By {authUser.firstName} {authUser.lastName}</p>
                </div>
                <div className="course--description">
                  <div><textarea id="description" name="description" className="" placeholder="Course description..." value={description} onChange={e => setDescription(e.target.value)} /></div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                          placeholder="Hours" value={estimatedTime} onChange={e => setEstTime(e.target.value)} /></div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded} onChange={e => setMaterialsNeeded(e.target.value)} /></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button></div>
            </form>
          </div>
        </div>
    );
  }
}

export default UpdateCourse;