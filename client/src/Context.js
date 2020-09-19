import React, { useState } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

export const Context = React.createContext();

export const Provider = (props) => {
  const [authenticatedUser, setUser] = useState(null);

  const signIn = async (username, password) => {
    const user = await Data.getUser(username, password);
    if (user !== null) {
      setUser(user);
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  return (
    <Context.Provider value={ {
      authenticatedUser,
      data: Data,
      actions: {
        signIn
      }
    } }>
      {props.children}
    </Context.Provider>  
  );
}