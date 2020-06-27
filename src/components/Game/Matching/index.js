import React, {useState} from 'react';
import {randomAlphaNum, useKeys} from "../../../effects/useKeys";
import {useSoundEffect} from "./Sound"

export const Matching = () => {
  const [pressedKey, setPressedKey] = useState(null);
  const [goal, setGoal] = useState(null);

  const alphaNum = key => {
    setPressedKey(String.fromCharCode(key));
  };

  const chooseGoal = () => {
    setGoal(randomAlphaNum())
  };

  const reset = () => {
    setGoal(null);
    setPressedKey(null);
  };

  const isWin = () => {
    return goal !== null
      && pressedKey !== null
      && (goal === pressedKey);
  };

  useKeys(alphaNum, alphaNum, chooseGoal, reset);
  useSoundEffect(pressedKey);


  return <div>
    <div class="Prompt">Press: {goal}</div>
    <div class="Board">{pressedKey}</div>
    { isWin() ? <div>WIN</div> : <div/>}
  </div>
};
