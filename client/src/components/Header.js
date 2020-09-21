import React, { useContext } from 'react';
import { Context } from '../Context';
import { Link, useLocation } from 'react-router-dom';

const Header = (props) => {
  const { authenticatedUser: authUser } = useContext(Context);
  const location = useLocation();
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
              <Link className="signin" to={{
                pathname: "/signin",
                state: { from: location }
              }}>Sign In</Link>
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