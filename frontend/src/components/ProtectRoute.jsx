import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useUser();

    // localStorage'dan yüklenip backend'e istek atılana kadar user null
    const isLoading = user === null && localStorage.getItem('user') === null;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;