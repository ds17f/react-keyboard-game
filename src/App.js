import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';

import { KeyResponse } from './components/KeyResponse';
import { GameBoard as LetterSearch } from "./components/Game/LetterSearch";
import { GameBoard as ColorMatchGame } from "./components/Game/ColorMatch/gameboard"
import { LetterLearning } from "./components/Game/LetterLearning";
import {TableTop} from "./components/TableTop";

const Modes = {
  "Keyboard": "Keyboard",
  "LetterSearch": "LetterSearch",
  "LetterSearch_Vowels": "LetterSearch_Vowels",
  "LetterSearch_A_Through_G": "LetterSearch_A_Through_G",
  "LetterSearch_H_Through_M": "LetterSearch_H_Through_M",
  "LetterSearch_N_Through_T": "LetterSearch_N_Through_T",
  "LetterSearch_U_Through_Z": "LetterSearch_U_Through_Z",
  "ColorMatch": "ColorMatch",
  "LetterLearning": "LetterLearning"
};

const Games = {
  [Modes.Keyboard]: KeyResponse,
  [Modes.LetterSearch]: ({width, height}) => <LetterSearch height={height} width={width} ALPHABET={"ABCDEFGHIJKLMOPQRSTUVWXYZ"} />,
  [Modes.LetterSearch_Vowels]: ({width, height}) => <LetterSearch height={height} width={width} ALPHABET={"AEIOU"} />,
  [Modes.LetterSearch_A_Through_G]: ({width, height}) => <LetterSearch height={height} width={width} ALPHABET={"abcdefgABCDEFG"} />,
  [Modes.LetterSearch_H_Through_M]: ({width, height}) => <LetterSearch height={height} width={width} ALPHABET={"hijklmHIJKLM"} />,
  [Modes.LetterSearch_N_Through_T]: ({width, height}) => <LetterSearch height={height} width={width} ALPHABET={"NOPQRSTnopqrst"} />,
  [Modes.LetterSearch_U_Through_Z]: ({width, height}) => <LetterSearch height={height} width={width} ALPHABET={"UVWXYZuvwxyz"} />,
  [Modes.ColorMatch]: ColorMatchGame,
  [Modes.LetterLearning]: LetterLearning
};

function App() {
  const [mode, setMode] = useState(Modes.LetterLearning);

  // const getContent = (mode) => {
  //   switch (mode) {
  //     case Modes.ColorMatch:
  //       return <ColorMatchGame columns={3} rows={3}/>;
  //
  //     case Modes.LetterSearch:
  //       return <LetterSearch/>;
  //
  //     case Modes.Keyboard:
  //       return <KeyResponse audioPath="set1/" />;
  //
  //     case Modes.LetterLearning:
  //       return <LetterLearning />;
  //
  //     default:
  //       return <div>unknown</div>
  //   }
  // };

  return (
    <TableTop
      top={
        <div>top</div>
      }
      gameBoard={
        Games[mode]
      }
      bottom={
        <Form.Control as="select" onChange={(e) => setMode(e.target.value)}>
          { Object.keys(Modes).map(gameMode =>
            <option value={gameMode} selected={mode === gameMode}>{gameMode}</option>
          )}
        </Form.Control>
      }
    />
  );

  // return (
  //   <div className="App">
  //
  //     {/*{ getContent(mode) }*/}
  //
  //     <div className="ModeSelect">
  //       <Form.Control as="select" onChange={(e) => setMode(e.target.value)}>
  //         { Object.keys(Modes).map(gameMode =>
  //           <option value={gameMode} selected={mode === gameMode}>{gameMode}</option>
  //         )}
  //       </Form.Control>
  //     </div>
  //     {/*<Prompt setGoal={setGoal}/>*/}
  //     {/*{ isBeta*/}
  //     {/*  ? <GameBoard columns={3} rows={3}/>*/}
  //     {/*  : <KeyResponse audioPath="set1/" setGuess={setGuess} />*/}
  //     {/*}*/}
  //     {/*{*/}
  //     {/*  goal !== null && goal === guess*/}
  //     {/*  ? <div>YOU WIN</div>*/}
  //     {/*  : <div />*/}
  //     {/*}*/}
  //
  //   </div>
  // );
}

export default App;
