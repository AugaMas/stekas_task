import React from 'react';
import Router from './components/Router';
import NavigationBar from './components/NavBar';

const App = () => {
  return (
    <>
      <NavigationBar />
      <div>Stekas task</div>
      <Router />
    </>
  );
};

export default App;
