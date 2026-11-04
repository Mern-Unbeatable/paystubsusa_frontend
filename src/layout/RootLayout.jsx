import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import NavbarLayout from './NavbarLayout';
import FooterLayout from './FooterLayout';

const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-secondary selection:text-white">
      <NavbarLayout />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FooterLayout />
    </div>
  );
};

export default RootLayout;
