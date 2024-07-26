import React from 'react';
import './LoadingPage.css';

function LoadingPage() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Summarising </p>
    </div>
  );
}

export default LoadingPage;
