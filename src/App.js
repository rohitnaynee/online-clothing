import React from 'react';
import {Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => (
  <div>
    HATSSSSSSSS PAGE
  </div>
);

function App() {
  return (
    <div className = 'App' > 
     <Switch>
        <Route path = '/hats' exact  component = {HatsPage}  />
        <Route  path = '/' exact component = {HomePage}   />
     </Switch>
    </div>
  );
}

export default App;