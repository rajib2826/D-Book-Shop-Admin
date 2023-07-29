import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// HOC for public routes
const withPublicRoute = (Component) => {
  const PublicRouteHOC = (props) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (currentUser?.userType === 'admin' || localStorage.getItem('token')) {
        navigate('/dashboard', { replace: true });
      }
    }, [currentUser, navigate]);

    return !currentUser && !localStorage.getItem('token') ? (
      <Component {...props} />
    ) : (
      <Navigate to='/dashboard' replace />
    );
  };

  return PublicRouteHOC;
};

export default withPublicRoute;
