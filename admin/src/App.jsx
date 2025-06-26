import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminsPage from './pages/AdminsPage';
import Profile from './pages/Profile';
import CreateProfile from './components/settings/Profile/CreateProfile';
import CreateSocial from './components/settings/social/CreateSocial';

// Portfolio
import Portfolio from './pages/portfolio/Portfolio';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path='/' element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="admins" element={<AdminsPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/create" element={<CreateProfile />} />
            <Route path="social/create" element={<CreateSocial />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;