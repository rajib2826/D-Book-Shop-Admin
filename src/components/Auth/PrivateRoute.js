import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// HOC for private routes
const withPrivateRoute = (Component) => {
  const PrivateRouteHOC = (props) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!currentUser && !localStorage.getItem('token')) {
        navigate('/', { replace: true });
      }
    }, [currentUser, navigate]);

    return currentUser?.userType === 'admin' ||
      localStorage.getItem('token') ? (
      <Component {...props} />
    ) : (
      <Navigate to='/' replace />
    );
  };

  return PrivateRouteHOC;
};

export default withPrivateRoute;
