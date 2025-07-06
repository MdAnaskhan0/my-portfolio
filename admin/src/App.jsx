import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminsPage from './pages/AdminsPage';
import Profile from './pages/Profile';

// Portfolio Profile
import CreateProfile from './components/settings/Profile/CreateProfile';
import User from './components/settings/Profile/User';
import UpdateProfile from './components/settings/Profile/UpdateProfile';

// Social Links
import CreateSocial from './components/settings/social/CreateSocial';
import SocialLinks from './components/settings/social/SocialLinks';
import UpadateLink from './components/settings/social/Link';

// Education
import CreateEducation from './components/settings/education/CreateEducation';
import Educations from './components/settings/education/Educations';
import UpdateEducation from './components/settings/education/UpdateEducation';

// Experience
import CreateExperience from './components/settings/experience/CreateExperience';
import Experiences from './components/settings/experience/Experiences';
import UpdateExperience from './components/settings/experience/UpdateExperience';

// Exparties
import CreateExparties from './components/settings/experties/CreateExparties';
import Exparties from './components/settings/experties/Exparties';
import UpdateExparties from './components/settings/experties/UpdateExparties';

// Skills
import CreateSkill from './components/settings/skill/CreateSkill';
import Skills from './components/settings/skill/Skills';
import UpdateSkill from './components/settings/skill/UpdateSkill';

// Publications
import CreatePublication from './components/settings/publications/CreatePublication';
import Publications from './components/settings/publications/Publications'; 
import UpdatePublication from './components/settings/publications/UpdatePublication';

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
            <Route path="profile/view" element={<User />} />
            <Route path="profile/:id" element={<UpdateProfile />} />

            <Route path="social/create" element={<CreateSocial />} />
            <Route path="social" element={<SocialLinks />} />
            <Route path="social/:id" element={<UpadateLink />} />

            <Route path="education/create" element={<CreateEducation />} />
            <Route path="education" element={<Educations />} />
            <Route path="education/:id" element={<UpdateEducation />} />

            <Route path="experience/create" element={<CreateExperience />} />
            <Route path="experience" element={<Experiences />} />
            <Route path="experience/:id" element={<UpdateExperience />} />

            <Route path="exparties/create" element={<CreateExparties />} />
            <Route path="exparties" element={<Exparties />} />
            <Route path="exparties/:id" element={<UpdateExparties />} />

            <Route path="skill/create" element={<CreateSkill />} />
            <Route path="skill" element={<Skills />} /> 
            <Route path="skill/:id" element={<UpdateSkill />} />

            <Route path="publication/create" element={<CreatePublication />} />
            <Route path="publication" element={<Publications />} /> 
            <Route path="publication/:id" element={<UpdatePublication />} />

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;