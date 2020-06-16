import React, { useState } from 'react';
import { useKeys } from '../../effects/useKeys'
import { useAudio } from "../../effects/useAudio";

export const KeyResponse = (props) => {
  const displayKey = keyCode => {
    console.log(`pressedKey: ${keyCode}`);
    setKeyCode(keyCode);
  };
  const noOp = keyCode => {
    console.log(`noop: ${keyCode}`)
  };

  const [keyCode, setKeyCode] = useState(null);

  useKeys(displayKey, displayKey, noOp, noOp);
  useAudio(keyCode);

  const pressedKey = String.fromCharCode(keyCode);

  let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
  return <div style={{color: randomColor, fontSize: 500}}>{pressedKey}</div>
};

