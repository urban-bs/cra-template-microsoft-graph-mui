import { PublicClientApplication } from '@azure/msal-browser';
import * as React from 'react';

interface UnauthorizedValue {
  phase: 'unauthorized';
  login(fromPath: string): void;
}

interface AuthorizingValue {
  phase: 'authorizing';
}

interface AuthorizedValue {
  phase: 'authorized';
  accessToken: string;
  fromPath: string;
}

export type AuthContextValue = UnauthorizedValue | AuthorizingValue | AuthorizedValue;

export const AuthContext = React.createContext<AuthContextValue>({ phase: 'unauthorized', login() {} });

export function createDefaultMsalClient() {

  return new PublicClientApplication({
    auth: {
      clientId: process.env.REACT_APP_AAD_CLIENT_ID ?? '',
      redirectUri: `${process.env.REACT_APP_HOST}callback`,
      authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AAD_TENANT_ID}`,
      navigateToLoginRequestUrl: false,
    },
  });
}
export const MsalClientContext = React.createContext<PublicClientApplication>(createDefaultMsalClient());