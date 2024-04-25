import './App.css';
import { Routes, Route } from "react-router-dom";
import RoverComponent from './components/RoverComponent';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import Collection from './pages/Collection';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AuthLayout from './layouts/AuthLayout';
import GuestLayout from './layouts/GuestLayout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route element={<GuestLayout />} >
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<AuthLayout />} >
        <Route path='/play' element={<RoverComponent />} />
      </Route>
      <Route path="/photos" element={<Collection />} />
      <Route element={<AuthLayout />} >
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
