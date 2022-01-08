import { Client } from '@microsoft/microsoft-graph-client';
import * as React from 'react';
import {useMemo} from 'react';
import { useAccessToken } from '../auth';
import { MsGraphClientContext } from './context';

const MsGraphClientProvider: React.FC = ({children}) => {
  const accessToken = useAccessToken();
  const client= useMemo(
    () => Client.init({authProvider: (cb) => cb(null, accessToken)}),
    [accessToken]
  );
  return (
    <MsGraphClientContext.Provider value={client}>
      {children}
    </MsGraphClientContext.Provider>
  );
}

export default MsGraphClientProvider;