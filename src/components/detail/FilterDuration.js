import React from 'react';

export default function FilterDuration({ days, setDays }) {
  return (
    <div className="text-right mb-3">
      <div className="btn-group flex-wrap">
        <button
          type="button"
          className={`btn btn-${days === 1 ? 'dark' : 'light'}`}
          onClick={() => setDays(1)}
        >
          1 day
        </button>
        <button
          type="button"
          className={`btn btn-${days === 7 ? 'dark' : 'light'}`}
          onClick={() => setDays(7)}
        >
          7 days
        </button>
        <button
          type="button"
          className={`btn btn-${days === 14 ? 'dark' : 'light'}`}
          onClick={() => setDays(14)}
        >
          14 days
        </button>
        <button
          type="button"
          className={`btn btn-${days === 30 ? 'dark' : 'light'}`}
          onClick={() => setDays(30)}
        >
          30 days
        </button>
        <button
          type="button"
          className={`btn btn-${days === 90 ? 'dark' : 'light'}`}
          onClick={() => setDays(90)}
        >
          90 days
        </button>
        <button
          type="button"
          className={`btn btn-${days === 180 ? 'dark' : 'light'}`}
          onClick={() => setDays(180)}
        >
          180 days
        </button>
        <button
          type="button"
          className={`btn btn-${days === 365 ? 'dark' : 'light'}`}
          onClick={() => setDays(365)}
        >
          365 days
        </button>
      </div>
    </div>
  );
}
