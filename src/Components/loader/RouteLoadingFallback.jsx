const RouteLoadingFallback = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-7 h-7 rounded-full border-2 border-slate-200 border-t-secondary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[40vh] w-full flex items-center justify-center px-6">
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
        <div className="w-5 h-5 rounded-full border-2 border-slate-200 border-t-secondary animate-spin" />
        <p className="text-sm font-medium text-slate-600">Loading page…</p>
      </div>
    </div>
  );
};

export default RouteLoadingFallback;
