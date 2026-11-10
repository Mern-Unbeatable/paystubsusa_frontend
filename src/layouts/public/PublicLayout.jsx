import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import NavbarLayout from "../../Components/navigation/public/NavbarLayout";
import FooterLayout from "../../Components/navigation/public/FooterLayout";

const PublicLayout = () => {
  const { pathname, state } = useLocation();
  const keepScroll = Boolean(state?.keepScroll);

  useEffect(() => {
    if (keepScroll) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, keepScroll]);

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

export default PublicLayout;
