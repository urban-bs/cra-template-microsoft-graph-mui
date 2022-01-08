import * as React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from './context';

const HandleCallback: React.FC = () => {
  const context = useContext(AuthContext);
  if (context.phase === 'authorized') {
    return <Navigate to={context.fromPath}/>
  }
  return null;
}

export default HandleCallback;