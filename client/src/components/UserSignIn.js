import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import InlineErrors from './InlineErrors';

const UserSignIn = (props) => {
  const { actions } = useContext(Context);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const { from } = props.location.state || { from: { pathname: '/' } };
    actions.signIn(emailAddress, password)
      .then(user => {
        if (user === null) {
          setErrors(['Sign-in was unsuccessful. Please check your username and password.']);
        } else {
          props.history.push(from);
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
  }

  const handleCancel = (event) => {
    event.preventDefault();
    props.history.push('/');
  }

  return (
    <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <InlineErrors errors={errors} />
            <form onSubmit={handleSubmit}>
              <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} /></div>
              <div><input id="password" name="password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /></div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
  )
};

export default UserSignIn;