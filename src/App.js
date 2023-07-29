import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Login from './page/Login';
import NotFound from './page/NotFound';
import AuthContextProvider from './components/Auth/AuthContext';
import withPublicRoute from './components/Auth/PublicRoute';
import withPrivateRoute from './components/Auth/PrivateRoute';
import StoreContextProvider from './components/Context/StoreContext';
import Dashboard from './page/Dashboard';

// Wrap components with the HOCs
const PublicLogin = withPublicRoute(Login);
const PrivateDashboard = withPrivateRoute(Dashboard);

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <StoreContextProvider>
          {/* Toast Notification */}
          <Toaster
            toastOptions={{
              duration: 3000,
            }}
          />
          <Routes>
            <Route path='/' element={<PublicLogin />} />
            <Route path='/:page' element={<PrivateDashboard />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </StoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
