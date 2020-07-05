import { useEffect } from "react";

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

export const useAudio2 = (tracks) => {
  useEffect(() => {
    const audio = new Audio();
    setupPlaylist(audio, tracks);
    audio.play();
    return () => {
      audio && audio.pause && audio.pause()
    }
  });

};
export const useAudio = (path, letter, db) => {
  useEffect(() => {
    if (letter === null) {
      return;
    }

    const audio = new Audio();

    if (db && db[letter]) {
      const choose = Math.floor(Math.random() * db[letter].length);
      const choice = db[letter][choose][0];
      setupPlaylist(audio, [
        `${window.location.origin}${window.location.pathname}audio/${path}${letter.toLowerCase()}.mp3`,
        `${window.location.origin}${window.location.pathname}audio/${path}as_in.mp3`,
        `${window.location.origin}${window.location.pathname}audio/${path}${letter}/${choice}`,
      ]);
    } else {
      audio.src = `${window.location.origin}${window.location.pathname}audio/${path}${letter.toLowerCase()}.mp3`;
    }

    audio.play();

    return () => {
      audio && audio.pause && audio.pause()
    }
  });
};

