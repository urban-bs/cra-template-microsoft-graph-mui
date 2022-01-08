import * as React from 'react';
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import { AuthContext } from './context';

const RequireAuth: React.FC = ({children}) => {
  const context = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (context.phase !== 'unauthorized') {
      return;
    }
    context.login(location.pathname);
  }, [context, location.pathname]);

  if (context.phase !== 'authorized') {
    return null;
  }

  return <>{children}</>
}

export default RequireAuth;