import { AppBar, Box, Container, Grid, Paper, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useMsGraphClient } from '../features/msgraph';

const TopPage: React.FC = () => {
  const client = useMsGraphClient();
  const [me, setMe] = useState<any>(null);

  useEffect(() => {
    if (me) {
      return;
    }
    client.api("/me").get().then((me) => {
      setMe(me);
    });
  }, [client, me]);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ml: 2}}>
            Microsoft Graph React App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{mt: 4}}>
        <Paper sx={{p:1}}>
          <Grid container component="dl" spacing={1}>
            <Grid item xs={3} component="dt">
              <Typography variant="subtitle1">Display Name</Typography>
            </Grid>
            <Grid item xs={9} component="dd">
              <Typography>{me?.displayName}</Typography>
            </Grid>
            <Grid item xs={3} component="dt">
              <Typography variant="subtitle1">Mail</Typography>
            </Grid>
            <Grid item xs={9} component="dd">
              <Typography>{me?.mail}</Typography>
            </Grid>
          </Grid>
        </Paper>

      </Container>
          
    </Box>
  )
}

export default TopPage;