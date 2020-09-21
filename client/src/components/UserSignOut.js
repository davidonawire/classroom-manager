import React, { useEffect, useContext } from 'react';
import { Context } from '../Context';
import { Redirect } from 'react-router-dom';

export default () => {
  const { actions } = useContext(Context);
  useEffect(() => actions.signOut());

  return (
    <Redirect to="/" />
  );
}