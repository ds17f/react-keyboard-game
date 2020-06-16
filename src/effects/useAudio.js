import { useEffect } from "react";

export const useAudio = (keyCode) => {
  useEffect(() => {
    if (keyCode === null) {
      return;
    }
    const pressedLetter = String.fromCharCode(keyCode);
    const audio = new Audio(`${window.location.origin}/audio/${pressedLetter}.mp3`);
    console.log(audio.src);
    audio.play();

    return () => {
      audio && audio.pause && audio.pause()
    }
  });
};

