import { Outlet } from 'react-router';
import NavbarLayout from './NavbarLayout';
import FooterLayout from './FooterLayout';

const RootLayout = () => {
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
