import { Client } from '@microsoft/microsoft-graph-client';
import * as React from 'react';
export const defaultMsGraphClient = Client.init({authProvider: (done) => {}});
export const MsGraphClientContext = React.createContext(defaultMsGraphClient);