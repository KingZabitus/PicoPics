import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import PicturesPage from './pages/Pictures';
import UsersPage from './pages/Users';
import HomePage from './pages/Home';
import { Box, CircularProgress } from '@mui/material';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return user ? children : <Navigate to="/" />;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  // Aqui você precisaria verificar se o usuário tem role ADMIN
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/pictures"
            element={
              <PrivateRoute>
                <PicturesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <AdminRoute>
                <UsersPage />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;