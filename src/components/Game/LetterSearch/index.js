import React, {useState} from 'react'
import {Table} from "react-bootstrap";
import "./styles.css"

export const  GameBoard = () => {
  const bias = [
    ["Y", .15, "lightblue"],
    ["H", .15, "red"],
    ["M", .15, "lightgreen"],
    ["O", .15, "orange"],
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
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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

const getRandomColor = () => {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
};

const getColorMap = (keyString) => {
  const colorMap = {};
  for (let letter of keyString) {
    const color = getRandomColor();
    colorMap[letter] = color !== "#D3D3D3" ? color : "#FF0000"
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

  const rowHeight = (window.innerHeight - 30) / numOfRows;
  const colWidth = (window.innerWidth * .8) / numOfColumns;

  const cellStyle = {
    display: "inline-block",
    width: colWidth,//(window.innerWidth * .8 )/ numOfColumns - 8,
    height: rowHeight,//rowHeight - 8,
    // margin: `${cellMargin}%`,
    backgroundColor: "lightgrey"
  };


  const audio = new Audio();
  const colorMap = getColorMap("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
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
    const path = "set1";
    audio.src = `${window.location.origin}${window.location.pathname}audio/${path}/${content.toLowerCase()}.mp3`;
    audio.play();
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

function lightOrDark(color) {

  // Variables for red, green, blue values
  var r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {

    // If RGB --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

    r = color[1];
    g = color[2];
    b = color[3];
  }
  else {

    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(
      color.length < 5 && /./g, '$&$&'));

    r = color >> 16;
    // eslint-disable-next-line
    g = color >> 8 & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );

  // Using the HSP value, determine whether the color is light or dark
  if (hsp>127.5) {

    return 'light';
  }
  else {

    return 'dark';
  }
}