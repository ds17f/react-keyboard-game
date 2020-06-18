import React, { useState } from 'react';
import { useKeys } from '../../effects/useKeys';
import { useAudio } from "../../effects/useAudio";

import "./styles.css";

export const KeyResponse = React.memo(({audioPath, setGuess, db}) => {
  const displayKey = keyCode => {
    console.log(`pressedKey: ${keyCode}`);
    // force state to change even on the same keypress
    setKeyCode(null);
    setKeyCode(keyCode);
    setGuess && setGuess(keyCode);
  };

  const [keyCode, setKeyCode] = useState(null);

  useKeys(displayKey, displayKey);
  useAudio(audioPath, keyCode, db);

  const pressedKey = String.fromCharCode(keyCode);

  let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
  return <div className="KeyResponse" style={{color: randomColor}}>{pressedKey}</div>
});

