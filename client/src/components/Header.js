import React, { useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';

const Header = () => {
  const { authenticatedUser: authUser } = useContext(Context);
  return (
    <>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>{authUser ?
            <>
              <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
              <Link className="signout" to="/signout">Sign Out</Link>
            </>
            :
            <>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </>
          }
          </nav>
        </div>
      </div>
      <hr />
    </>
  )
}

export default Header;