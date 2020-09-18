import React, { useState } from 'react';

export const Context = React.createContext();

export const Provider = (props) => {
  const [authenticatedUser, setUser] = useState(null);

  return (
    <Context.Provider value={ value }>
      {props.children}
    </Context.Provider>  
  );
}