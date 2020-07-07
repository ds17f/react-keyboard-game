import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';

import { KeyResponse } from './components/KeyResponse';
import { GameBoard as LetterSearch } from "./components/Game/LetterSearch";
import { GameBoard as ColorMatchGame } from "./components/Game/ColorMatch/gameboard"
import { LetterLearning } from "./components/Game/LetterLearning";

const Modes = {
  "Keyboard": "Keyboard",
  "LetterSearch": "LetterSearch",
  "ColorMatch": "ColorMatch",
  "LetterLearning": "LetterLearning"
};


function App() {
  const [mode, setMode] = useState(Modes.LetterLearning);

  const getContent = (mode) => {
    switch (mode) {
      case Modes.ColorMatch:
        return <ColorMatchGame columns={3} rows={3}/>;

      case Modes.LetterSearch:
        return <LetterSearch/>;

      case Modes.Keyboard:
        return <KeyResponse audioPath="set1/" />;

      case Modes.LetterLearning:
        return <LetterLearning />;

      default:
        return <div>unknown</div>
    }
  };


  return (
    <div className="App">

      { getContent(mode) }

      <div className="ModeSelect">
        <Form.Control as="select" onChange={(e) => setMode(e.target.value)}>
          { Object.keys(Modes).map(gameMode =>
            <option value={gameMode} selected={mode === gameMode}>{gameMode}</option>
          )}
        </Form.Control>
      </div>
      {/*<Prompt setGoal={setGoal}/>*/}
      {/*{ isBeta*/}
      {/*  ? <GameBoard columns={3} rows={3}/>*/}
      {/*  : <KeyResponse audioPath="set1/" setGuess={setGuess} />*/}
      {/*}*/}
      {/*{*/}
      {/*  goal !== null && goal === guess*/}
      {/*  ? <div>YOU WIN</div>*/}
      {/*  : <div />*/}
      {/*}*/}

    </div>
  );
}

export default App;
