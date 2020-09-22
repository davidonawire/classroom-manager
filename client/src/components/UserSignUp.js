import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import InlineErrors from './InlineErrors';

const UserSignUp = (props) => {
  const { actions, data } = useContext(Context);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState([]);
  
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check whether passwords match
    if (password === confirmPassword) {
      const user = {
        firstName,
        lastName,
        emailAddress,
        password
      };

      data.createUser(user)
        .then(errors => {
          if (errors.length) {
            setErrors(errors);
          } else {
            actions.signIn(emailAddress, password)
              .then(() => props.history.push('/'));
          }
        })
        .catch(err => {
          console.log(err);
          props.history.push('/error');
        });
    } else {
      // Passwords don't match
      setErrors([ 'Passwords do not match.' ]);
    }
  }

  const handleCancel = (event) => {
    props.history.push('/');
  }

  return (
    <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <InlineErrors errors={errors} />
            <form onSubmit={handleSubmit}>
              <div><input id="firstName" name="firstName" type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
              <div><input id="lastName" name="lastName" type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} /></div>
              <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" value={emailAddress}  onChange={e => setEmailAddress(e.target.value)} /></div>
              <div><input id="password" name="password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
  )
};

export default UserSignUp;