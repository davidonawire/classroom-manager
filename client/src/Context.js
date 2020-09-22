import React, { useState } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

export const Context = React.createContext();

// Context provider to persist authenticated user state throughout app and session
export const Provider = (props) => {
  const [authenticatedUser, setUser] = useState(Cookies.getJSON('authenticatedUser') || null);

  const signIn = async (username, password) => {
    const user = await Data.getUser(username, password);
    if (user !== null) {
      // Ensure we're storing the password from initial auth in the session
      user.password = password;
      setUser(user);
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  const signOut = () => {
    setUser(null);
    Cookies.remove('authenticatedUser');
  }

  return (
    <Context.Provider value={ {
      authenticatedUser,
      data: Data,
      actions: {
        signIn,
        signOut
      }
    } }>
      {props.children}
    </Context.Provider>  
  );
}