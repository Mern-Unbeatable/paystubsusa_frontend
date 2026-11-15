import React from "react";

/**
 * Shared shell for every page after the W-2 landing: create, checkout, success.
 * `children` is the page content (or a render function, for Generator parity).
 */
const W2FlowPage = ({ children }) => (
  <div className="w-full min-h-screen bg-[#F4F7FB] border-t border-slate-200/80">
    <div className="w-full max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-14">
      {typeof children === "function" ? children() : children}
    </div>
  </div>
);

export default W2FlowPage;
