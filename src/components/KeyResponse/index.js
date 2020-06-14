import React, { useState } from 'react';
import { useKeys } from '../../effects/useKeys'

export const KeyResponse = (props) => {
  const [keyCode, setKeyCode] = useState(null);

  const displayKey = keyCode => {
    console.log(`pressedKey: ${keyCode}`);
    setKeyCode(keyCode);
  };

  const noOp = keyCode => {
    console.log(`noop: ${keyCode}`)
  };

  useKeys(displayKey, displayKey, noOp, noOp);

  const pressedKey = String.fromCharCode(keyCode);

  let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
  return <div style={{color: randomColor, fontSize: 500}}>{pressedKey}</div>
};

