import React from 'react'
import {Table} from "react-bootstrap";
import speechSynth from "speech-synthesis";
import { lightOrDark } from "../../../lib";

import "./styles.css"

const shuffleArray = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};


export const GameBoard = () => {
  const colorList = [
    "red","yellow","blue",
    "green","orange","purple",
    "white","black",
    "pink",
    "grey","brown", "tan"
  ];
  const rows = 3;
  const columns = 4;

  const makeMatrix = (x, y, source) => {
    let index = 0;
    const matrix = [];
    for (let row = 0; row < y; row++) {
      matrix.push([]);
      for (let col = 0; col < x; col++) {
        matrix[row].push(source[index]);
        index++;
      }
    }
    return matrix;
  };

  const rowHeight = (window.innerHeight - 90) / rows;
  const colWidth = (window.innerWidth * .8) / columns;

  const cellStyle = {
    display: "inline-block",
    width: colWidth,
    height: rowHeight,
    verticalAlign: "middle",
    textAlign: "center",
    fontSize: 32
  };

  const matrix = makeMatrix(columns, rows, shuffleArray(colorList));
  return (
    <div className="GameBoard">
      <Table className="ColorMatch" onClick={(e) => {e.preventDefault()}}>
        <tbody onClick={(e) => {e.preventDefault()}}>
        {
          matrix.map(row => {
            return <tr onClick={(e) => {e.preventDefault()}}>
              {
                row.map(col => {
                  const style = Object.assign({}, cellStyle, {background: col});
                  style.color = lightOrDark(col) === "light" || col === "black" ? "white" : "black";
                  return (
                    <td onClick={() => !window.speechSynthesis.speaking && speechSynth(col, 'en-US')} style={style}>
                      {col[0].toUpperCase()}
                    </td>
                  )
                })
              }
            </tr>
          })

        }
        </tbody>
      </Table>
    </div>
  )

};