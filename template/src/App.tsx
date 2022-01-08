
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider, MsalClientProvider } from './features/auth';
import {AuthCallbackPage, TopPage} from './pages';
import RequireAuth from './features/auth/RequireAuth';
import { MsGraphClientProvider } from './features/msgraph'

const App: React.FC = () => {
  return (
    <MsalClientProvider>
      <AuthProvider>
        <MsGraphClientProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/callback" element={<AuthCallbackPage/>}/>
              <Route path="/" element={
                <RequireAuth><TopPage/></RequireAuth>
              }/>
            </Routes>
          </BrowserRouter>
        </MsGraphClientProvider>
      </AuthProvider>
    </MsalClientProvider>
  );
}

export default App;
