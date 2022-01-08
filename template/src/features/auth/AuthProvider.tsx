import * as React from 'react';
import { useEffect, useState } from 'react';
import { AuthContext, AuthContextValue } from './context';
import { useMsalClient } from './hook';

interface UnauthorizedState {
  state: 'unauthorized';
}

interface AuthorizingState {
  state: 'authorizing';
  fromPath: string;
}

interface AuthorizedState {
  state: 'authorized';
  fromPath: string;
  accessToken: string;
}

type AuthState = UnauthorizedState | AuthorizingState | AuthorizedState;

const NavStateKey = 'navState';

function restoreAuthState(): AuthState {
  const state = sessionStorage.getItem(NavStateKey);
  if (state === null) {
    return {state: 'unauthorized'};
  }
  return JSON.parse(state);
}

function storeAuthState(state: AuthState): void {
  sessionStorage.setItem(NavStateKey, JSON.stringify(state));
}

function clearAuthState(): void {
  sessionStorage.removeItem(NavStateKey);
}


const AuthProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(restoreAuthState());
  const client = useMsalClient();
  useEffect(() => {
    if (authState.state !== 'authorizing') {
      return;
    }
    client.handleRedirectPromise().then((res) => {
      if (!res) {
        return;
      }
      clearAuthState();
      setAuthState({ 
        state: 'authorized', 
        fromPath: authState.fromPath,
        accessToken: res.accessToken });
    });
  }, [authState, client]);

  const value = React.useMemo((): AuthContextValue => {
    if (authState.state === 'unauthorized') {
      return {
        phase: 'unauthorized',
        login(fromPath: string) {
          storeAuthState({state: 'authorizing', fromPath});
          client.loginRedirect({scopes: ['User.Read']});
        },
      }
    }

    if (authState.state === 'authorizing') {
      return { phase: 'authorizing'};
    }

    return {
      phase: 'authorized',
      accessToken: authState.accessToken,
      fromPath: authState.fromPath,
    }
  }, [authState, client]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;