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
import Career from './pages/Career';
import About from './pages/About';
import BlogDetail from './pages/BlogDetail';
import OurBlog from './pages/OurBlog';
import Pricing from './pages/Pricing';
import Portfolio from './pages/Portfolio';
import Team from './pages/Team';
import TeamDetails from './pages/TeamDetails';
import PortfolioDetails from './pages/PortfolioDetails';
import Services from './pages/Services';
import SeviceDetail from './pages/SeviceDetail';
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
          <Route path="career" element={<Career />} />
          <Route path="ourblog" element={<OurBlog />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="team" element={<Team />} />
          <Route path="team/:id" element={<TeamDetails />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:slug" element={<PortfolioDetails />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="servicespage" element={<Services />} />
          <Route path="servicedetail" element={<SeviceDetail />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
