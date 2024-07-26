import React from 'react';
import './LoadingPage.css';

function LoadingPage() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className='spinner-text'>Summarising </p>
    </div>
  );
}

export default LoadingPage;
