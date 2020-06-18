import { useEffect } from "react";
import db from "./db"

const setupPlaylist = (audioElement, tracks) => {
  let i = 0;

  audioElement.src = tracks[0];
  audioElement.addEventListener("ended", () => {
    i++;
    if (i < tracks.length) {
      audioElement.src = tracks[i];
      audioElement.load();
      audioElement.play();
    }
  }, false)
};

export const useAudio = (path, keyCode) => {
  useEffect(() => {
    if (keyCode === null) {
      return;
    }
    const pressedLetter = String.fromCharCode(keyCode);
    const audio = new Audio();
    if (db[pressedLetter]) {
      const choose = Math.floor(Math.random() * db[pressedLetter].length);
      const choice = db[pressedLetter][choose][0];
      setupPlaylist(audio, [
        `${window.location.origin}/audio/${path}${pressedLetter}.mp3`,
        `${window.location.origin}/audio/${path}as_in.mp3`,
        `${window.location.origin}/audio/${path}${pressedLetter}/${choice}`,
      ]);
    } else {
      audio.src = `${window.location.origin}/audio/${path}${pressedLetter}.mp3`;
    }

    audio.play();

    return () => {
      audio && audio.pause && audio.pause()
    }
  });
};

