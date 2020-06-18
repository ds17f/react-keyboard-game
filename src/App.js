import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';

import { KeyResponse } from './components/KeyResponse';
import { Prompt } from './components/Prompt';

function App() {
  const [goal, setGoal] = useState(null);
  const [guess, setGuess] = useState(null);

  return (
    <div className="App">
      <Prompt setGoal={setGoal}/>
      <KeyResponse setGuess={setGuess}/>
      {
        goal !== null && goal === guess
        ? <div>YOU WIN</div>
        : <div />
      }
    </div>
  );
}

export default App;
