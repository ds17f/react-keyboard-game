import React from 'react';
import { KeyResponse } from "../../KeyResponse";
import db from './db'

export const LetterImage = ({setGuess}) => {

  return <KeyResponse
    db={db}
    audioPath="set2/"
    setGuess={setGuess} />

};
