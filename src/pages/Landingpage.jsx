import React from 'react';

const LandingPage = () => {
  return (
    <div>
      <h1>Creat your story by AI</h1>
      <p>Journey begins by clicking below. </p>
      <button onClick={() => window.location.href = '/storybot'}>Get Started</button>
    </div>
  );
};

export default LandingPage;
