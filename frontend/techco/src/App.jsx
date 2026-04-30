import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import About from './pages/About';
import { AdminRoutes } from './admin/routes/AdminRoutes';

function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Public site */}
        <Route path="/*" element={<PublicLayout />}>
          <Route path="" element={<div />} />
          <Route path="contactus" element={<Contact />} />
          <Route path="aboutus" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
