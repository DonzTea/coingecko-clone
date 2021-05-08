import React from 'react';

export default function Loading() {
  return (
    <div className="d-flex justify-content-center py-5">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
