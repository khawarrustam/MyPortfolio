import React, { useState, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const ResumePage = React.lazy(() => import('./pages/ResumePage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

function Loader() {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #2563EB', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
        <span>Loading...</span>
        <style>
          {`@keyframes spin { to { transform: rotate(360deg); } }`}
        </style>
      </div>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState('home');

  const handleSetActive = (id: string) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pages: Record<string, React.ReactNode> = {
    home: <HomePage setActive={handleSetActive} />,
    about: <AboutPage setActive={handleSetActive} />,
    projects: <ProjectsPage />,
    resume: <ResumePage />,
    contact: <ContactPage />,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0B1120' }}>
      <Navbar active={activePage} setActive={handleSetActive} />
      <main>
        <Suspense fallback={<Loader />}>
          {pages[activePage]}
        </Suspense>
      </main>
      <Footer setActive={handleSetActive} />
    </div>
  );
}
