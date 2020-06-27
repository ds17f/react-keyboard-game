import React, { useState } from 'react';
import { useKeys } from '../../effects/useKeys';
import { useAudio } from "../../effects/useAudio";

import "./styles.css";

export const KeyResponse = React.memo(({audioPath, setGuess, db}) => {
  const displayKey = keyCode => {
    console.log(`pressedKey: ${keyCode}`);
    // force state to change even on the same keypress
    setKey(null);
    const key = String.fromCharCode(keyCode);
    setKey(key);
    setGuess && setGuess(key);
  };

  const [pressedKey, setKey] = useState(null);

  useKeys(displayKey, displayKey);
  useAudio(audioPath, pressedKey, db);

  let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
  return <div className="KeyResponse" style={{color: randomColor}}>{pressedKey}</div>
});

