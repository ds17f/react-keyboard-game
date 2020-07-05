import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';

import { KeyResponse } from './components/KeyResponse';
import { Prompt } from './components/Prompt';
import { GameBoard } from "./components/Game/LetterSearch";

function App() {
  const [goal, setGoal] = useState(null);
  const [guess, setGuess] = useState(null);
  const [isBeta, setBeta] = useState(false);

  return (
    <div className="App">
      <Prompt setGoal={setGoal}/>
      { isBeta
        ? <GameBoard/>
        : <KeyResponse audioPath="set1/" setGuess={setGuess} />
      }
      {
        goal !== null && goal === guess
        ? <div>YOU WIN</div>
        : <div />
      }
      <Form.Check
        checked={isBeta}
        onClick={() => {setBeta(!isBeta)}}
        label="Beta Mode"
      />
    </div>
  );
}

export default App;
