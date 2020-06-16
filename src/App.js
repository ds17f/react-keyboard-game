import React from 'react';
// import logo from './logo.svg';
import './App.css';

import { KeyResponse } from './components/KeyResponse';

function App() {
  return (
    <div className="App">
      <KeyResponse keyCode={99}/>
    </div>
  );
}

export default App;
