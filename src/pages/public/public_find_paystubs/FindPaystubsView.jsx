import React, { useEffect } from 'react';
import FindPaystubsContent from '../../../Components/FindPaystubs/FindPaystubsContent';

const FindPaystubsView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#F7FAFF] flex flex-col min-h-screen">
      <FindPaystubsContent />
    </div>
  );
};

export default FindPaystubsView;
