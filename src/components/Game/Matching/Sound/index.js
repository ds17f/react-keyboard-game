import { useAudio2 } from "../../../../effects/useAudio";

import db from './Vocabulary/db';
const path = 'set2/';

export const useSoundEffect = (letter) => {

  let tracks = [];
  if (db && db[letter]) {
    const choose = Math.floor(Math.random() * db[letter].length);
    const choice = db[letter][choose][0];

    tracks.push(`${window.location.origin}${window.location.pathname}audio/${path}${letter}.mp3`);
    tracks.push(`${window.location.origin}${window.location.pathname}audio/${path}as_in.mp3`);
    tracks.push(`${window.location.origin}${window.location.pathname}audio/${path}${letter}/${choice}`);

  } else {
    tracks.push(`${window.location.origin}${window.location.pathname}audio/${path}${letter}.mp3`);
  }

  return useAudio2(tracks);

};
