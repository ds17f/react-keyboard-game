import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';

import { KeyResponse } from './components/KeyResponse';
import { Prompt } from './components/Prompt';
import { LetterImage } from "./components/Screens/LetterImage";

function App() {
  const [goal, setGoal] = useState(null);
  const [guess, setGuess] = useState(null);
  const [isBeta, setBeta] = useState(false);

  // return <Matching/>;

  return (
    <div className="App">
      <Prompt setGoal={setGoal}/>
      { isBeta
        ? <LetterImage setGuess={setGuess} />
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
