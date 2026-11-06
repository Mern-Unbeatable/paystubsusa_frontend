import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-secondary selection:text-white">
      <main className="flex-grow flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
