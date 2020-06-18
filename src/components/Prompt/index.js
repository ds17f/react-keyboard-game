import React, { useState } from 'react';
import { useKeys } from "../../effects/useKeys";

import "./styles.css"

export const Prompt = ({setGoal}) => {
  const promptForKey = () => {
    // generate a random number or letter
    let randomKeyCode = Math.floor((Math.random()*36));
    if (randomKeyCode < 10) {
      randomKeyCode += 48;
    } else {
      randomKeyCode += 65 - 10;
    }
    const randomKey = String.fromCharCode(randomKeyCode);
    setGoal && setGoal(randomKeyCode);
    setTargetKey(randomKey)
  };
  const reset = () => {
    console.log("reset");
    setGoal && setGoal(null);
    setTargetKey(null);
  };

  useKeys(null, null, promptForKey, reset);
  const [targetKey, setTargetKey] = useState(null);

  return targetKey === null
    ? <div />
    : <div className="Prompt">Find and Press: <span className="TargetKey">{targetKey}</span></div>

};
