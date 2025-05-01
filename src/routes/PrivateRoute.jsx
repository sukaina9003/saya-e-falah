import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const auth = getAuth();
  const user = auth.currentUser; // Check if the user is logged in

  return user ? (
    <Element {...rest} /> // If logged in, render the component
  ) : (
    <Navigate to="/login" replace /> // If not logged in, redirect to the login page
  );
};

export default PrivateRoute;
