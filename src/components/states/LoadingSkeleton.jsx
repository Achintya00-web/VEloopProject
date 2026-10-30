import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <div className="w-100 max-w-md mx-auto space-y-4 animate-pulse user-select-none">
      <div className="card rounded-4 bg-[#191C2B] p-4 border border-white/5 space-y-3">
        <div className="d-flex align-items-center gap-3">
          <div className="w-14 h-16 rounded-3 bg-white/5" />
          <div className="space-y-2 flex-1">
            <div className="h-6 w-32 bg-white/5 rounded" />
            <div className="h-3 w-40 bg-white/5 rounded" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-100 bg-white/5 rounded-pill" />
          <div className="d-flex justify-content-between">
            <div className="h-3 w-20 bg-white/5 rounded" />
            <div className="h-3 w-20 bg-white/5 rounded" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-4 w-28 bg-white/5 rounded" />
        <div className="row g-2">
          <div className="col-4"><div className="h-20 rounded-4 bg-[#191C2B] border border-white/5" /></div>
          <div className="col-4"><div className="h-20 rounded-4 bg-[#191C2B] border border-white/5" /></div>
          <div className="col-4"><div className="h-20 rounded-4 bg-[#191C2B] border border-white/5" /></div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-4 w-24 bg-white/5 rounded" />
        <div className="row g-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="col-4 col-sm-2">
              <div className="h-20 rounded-4 bg-[#191C2B] border border-white/5" />
            </div>
          ))}
        </div>
      </div>

      <div className="h-28 rounded-4 bg-[#191C2B] border border-white/5" />
    </div>
  );
};
