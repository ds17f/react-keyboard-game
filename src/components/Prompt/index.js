import React, { useState } from 'react';
import {randomAlphaNum, useKeys} from "../../effects/useKeys";

import "./styles.css"

export const Prompt = ({setGoal}) => {
  const promptForKey = () => {
    const alphaNum = randomAlphaNum();
    setGoal && setGoal(alphaNum);
    setTargetKey(alphaNum)
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
