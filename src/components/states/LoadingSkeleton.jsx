import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <div className="w-100 max-w-6xl mx-auto space-y-4 animate-pulse user-select-none py-1">
      <div className="cosmic-state-card p-4 space-y-3">
        <div className="h-4 w-44 bg-purple-300/15 rounded" />
        <div className="h-9 w-72 max-w-100 bg-purple-300/15 rounded" />
        <div className="h-4 w-80 max-w-100 bg-purple-300/10 rounded" />
        <div className="d-flex flex-wrap gap-2 pt-1">
          <div className="h-10 w-40 bg-purple-300/15 rounded-3" />
          <div className="h-10 w-36 bg-purple-300/10 rounded-3" />
        </div>
      </div>

      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-md-6">
          <div className="card h-100 cosmic-state-card p-4 space-y-3">
            <div className="d-flex align-items-center gap-3">
              <div className="w-16 h-16 rounded-3 bg-purple-300/15 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-7 w-32 bg-purple-300/15 rounded" />
                <div className="h-3 w-40 bg-purple-300/10 rounded" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-3 w-100 bg-purple-300/10 rounded-pill" />
              <div className="d-flex justify-content-between">
                <div className="h-3 w-24 bg-purple-300/10 rounded" />
                <div className="h-3 w-24 bg-purple-300/10 rounded" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card h-100 cosmic-state-card p-4 space-y-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="h-5 w-32 bg-purple-300/15 rounded" />
              <div className="h-6 w-20 bg-purple-300/10 rounded-3" />
            </div>
            <div className="row g-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="col-6 col-sm-3">
                  <div className="h-24 rounded-4 bg-purple-300/10 border border-purple-400/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="cosmic-state-card p-4 space-y-3">
        <div className="h-5 w-36 bg-purple-300/15 rounded" />
        <div className="row g-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="col-6 col-md-3">
              <div className="h-28 rounded-4 bg-purple-300/10 border border-purple-400/20" />
            </div>
          ))}
        </div>
      </div>

      <div className="h-44 cosmic-state-card" />
    </div>
  );
};
