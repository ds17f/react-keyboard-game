import {useEffect} from "react";

const alpha = callback => {
  return evt => {
    if ( evt.keyCode >= 65 && evt.keyCode <= 90 ) {
      callback(evt.keyCode);
    }
  };
};

const numeric = callback => {
  return evt => {
    if ( evt.keyCode >= 48 && evt.keyCode <= 57 ) {
      callback(evt.keyCode);
    }
  }
};

const spacebar = callback => {
  return (evt) => {
    if ( evt.keyCode === 32 ) {
      evt.preventDefault();
      callback(evt.keyCode);
    }
  };
};

const esc = callback => {
  return (evt) => {
    if ( evt.keyCode === 27 ) {
      evt.preventDefault();
      callback(evt.keyCode);
    }
  };
};

export const randomAlphaNum = () => {
  const alphaNum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const rand = Math.floor((Math.random()*36));
  return alphaNum[rand];
};

export const useKeys = (alphaCallback, numericCallback, spacebarCallback, escCallback) => {
  useEffect(() => {
    const callbacks = [];
    alphaCallback && callbacks.push(alpha(alphaCallback));
    numericCallback && callbacks.push(numeric(numericCallback));
    spacebarCallback && callbacks.push(spacebar(spacebarCallback));
    escCallback && callbacks.push(esc(escCallback));

    callbacks.forEach(cb => document.addEventListener("keydown", cb, false));

    return () => {
      callbacks.forEach(cb => document.removeEventListener("keydown", cb, false));
    }

  });

};
