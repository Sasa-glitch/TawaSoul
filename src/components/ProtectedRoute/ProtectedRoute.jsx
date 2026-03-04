import React, { Children, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { authObject } from '../../context/TokenContext/TokenContext';

export default function ProtectedRoute({children}) {
    const {token} = useContext(authObject);
    
    if (token === null) {
       return <Navigate to={'/login'} />
    } else {
        return (
            <>
                {children}
            </>
        )
    }
  
}
