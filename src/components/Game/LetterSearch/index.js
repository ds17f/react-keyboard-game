import React, {useState} from 'react'
import {Table} from "react-bootstrap";
import "./styles.css"
import {chooseVocabularyWord, lightOrDark, randomColor} from '../../../lib'
import speechSynth from "speech-synthesis";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const  GameBoard = () => {

  const rands = [
    Math.floor((Math.random()*ALPHABET.length)),
    Math.floor((Math.random()*ALPHABET.length)),
    Math.floor((Math.random()*ALPHABET.length)),
  ];

  const bias = [
    [ALPHABET[rands[0]], .20, "lightblue"],
    [ALPHABET[rands[1]], .20, "red"],
    [ALPHABET[rands[2]], .20, "lightgreen"],
  ];

  const size = Math.min(10,Math.floor((window.innerHeight - 30) / 60));

  return (
    <div className="GameBoard">
      <LetterSearch size={size} bias={bias} />
    </div>
  )

};

// bias is an array of letters and their weights
// so [["A",.25],["Z",.10]]
const randomAlpha = (bias) => {
  let alphabet = ALPHABET;
  // remove the biased letters from the alphabet
  bias.forEach(x => alphabet = alphabet.replace(x[0], ""));

  // build a weighted array
  let seed = 0;
  const weighted = bias.map((x) => {
    seed += x[1];
    return [x[0],seed, () => x[0]]
  });
  // add in the final choice for random alphabet
  weighted.push([
    alphabet,
    1,
    () => {
      const rand = Math.floor((Math.random()*alphabet.length));
      return alphabet[rand];
    }
  ]);

  const random = Math.random();

  for (let option of weighted) {
    if (random < option[1]) {
      return option[2]();
    }
  }
};


const getColorMap = (keyString) => {
  const colorMap = {};
  for (let letter of keyString) {
    const color = randomColor();
    colorMap[letter] = color !== "#D3D3D3" || color !== "lightgrey" ? color : "#FF0000"
  }

  return colorMap;
};


const generateLetterMatrix = (x, y, bias) => {

  const matrix = [];
  for (let row = 0; row < y; row++) {
    const colArr = [];
    matrix.push(colArr);
    for (let col = 0; col < x; col++) {
      colArr.push(randomAlpha(bias));
    }
  }
  return matrix;
};

const LetterSearch = ({size , bias}) => {
  const numOfRows = size;
  const numOfColumns = size;

  const matrix = generateLetterMatrix(numOfRows, numOfColumns, bias);

  const rowHeight = (window.innerHeight - 90) / numOfRows;
  const colWidth = (window.innerWidth * .8) / numOfColumns;

  const cellStyle = {
    display: "inline-block",
    width: colWidth,//(window.innerWidth * .8 )/ numOfColumns - 8,
    height: rowHeight,//rowHeight - 8,
    // margin: `${cellMargin}%`,
    backgroundColor: "lightgrey"
  };


  const audio = new Audio();
  const colorMap = getColorMap(ALPHABET);
  return matrix
    ? <Table className="LetterSearch" onClick={(e) => {e.preventDefault()}}>
        <tbody onClick={(e) => {e.preventDefault()}}>
        {
          matrix.map(row => {
            return <tr onClick={(e) => {e.preventDefault()}}>
              {
                row.map(col => {
                  return <SelectCell style={cellStyle} content={col} selectedColor={colorMap[col]} audio={audio} />
                })
              }
            </tr>
          })

        }
        </tbody>
      </Table>
    : <div />

};

const SelectCell = ({content, selectedColor, style, audio}) => {
  const [isSelected, setSelected] = useState(false);

  const speakLetter = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const [word, ] = chooseVocabularyWord(content);
    speechSynth(`${content}... ... ${word}`, 'en-US');

  };

  const onClick = () => {
    console.log("click");
    speakLetter();
    setSelected(true);
  };
  const foreground = lightOrDark(selectedColor) === "light" ? "black" : "white";

  const newStyle = isSelected
    ? Object.assign({}, style, {backgroundColor: selectedColor, color: foreground})
    : style;

  return (
  <td className="LetterCell" style={newStyle} onClick={onClick}>
    {content}
  </td>
  )
};
