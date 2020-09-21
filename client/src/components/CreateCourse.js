import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import InlineErrors from './InlineErrors';

const CreateCourse = (props) => {
  const { authenticatedUser: authUser, userPassword, data } = useContext(Context);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');

  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id
    }

    data.createCourse(course, authUser.emailAddress, userPassword)
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
    props.history.push('/');
  }

  return (
    <div className="bounds course--detail">
        <h1>Create Course</h1>
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
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button></div>
          </form>
        </div>
      </div>
  );
}

export default CreateCourse;