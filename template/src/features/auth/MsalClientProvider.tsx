import { Box, Card, Container, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { createDefaultMsalClient, MsalClientContext } from './context';
import { styled } from '@mui/system';

function checkEnv(): boolean {
  return process.env.REACT_APP_AAD_CLIENT_ID !== undefined &&
    process.env.REACT_APP_HOST !== undefined &&
    process.env.REACT_APP_AAD_TENANT_ID !== undefined
}

const Code = styled(Box)({
  whiteSpace: 'pre'
});

const ConfigurationError: React.FC = () => {
  const {protocol, host} = window.location;
  const dotEnv = `REACT_APP_AAD_CLIENT_ID=[Your client id of Azure AD Application]
REACT_APP_HOST=${protocol}//${host}/
REACT_APP_AAD_TENANT_ID=[Your id of Azure AD tenant]`;
  return (
    <Container sx={{mt:4}}>
      <Card sx={{p:2}}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h2" sx={{color: 'error.main'}}>Configuration Error</Typography>
          <Box>
            Follwing entries should be set in .env file.
          </Box>
          <Code sx={{p: 2, borderRadius: 1, bgcolor: 'black', color: 'white'}}>{dotEnv}</Code>
        </Stack>        
      </Card>
    </Container>
    )
}
const MsalClientProvider: React.FC = ({ children }) => {

  const value = React.useMemo(createDefaultMsalClient, []);
  if (!checkEnv()) return <ConfigurationError/>;

  return (
    <MsalClientContext.Provider value={value}>
      {children}
    </MsalClientContext.Provider>
  );
}


export default MsalClientProvider;