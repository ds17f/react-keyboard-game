import React, {useState} from 'react';
import {useKeys} from "../../../effects/useKeys";
import speechSynth from "speech-synthesis";

import vocabulary from "./vocabulary"

import "./styles.css"
import {randomColor} from "../../../lib";

export const LetterLearning = () => {
  const [pressedKey, setPressedKey] = useState(null);
  const [img, setImg] = useState(null);

  const chooseWord = (letter) => {
    const words = vocabulary[letter.toUpperCase()];
    const randomChoice = Math.floor(Math.random() * words.length);
    return words[randomChoice];
  };

  const displayKey = keyCode => {
    // don't do anything if we're still speaking the last word
    if (window.speechSynthesis.speaking) {
      return;
    }
    // force state to change even on the same keypress
    setPressedKey(null);
    const key = String.fromCharCode(keyCode);
    setPressedKey(key);

    const [word, image] = chooseWord(key);

    setImg(image);

    speechSynth(`${key}... ... ${word}`, 'en-US')
  };

  useKeys(displayKey);


  return (
    <div style={{color: randomColor()}} className="LetterLearning">
      {pressedKey}
      {img ? <img alt="thing" src={img} /> : ""}
    </div>
  )
};
