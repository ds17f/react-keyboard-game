import vocabulary from "./vocabulary";

export const randomColor = () => {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
};

export const lightOrDark = (color) => {

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
};

export const chooseRandomVocabularyWord = (letter) => {
  const words = vocabulary[letter.toUpperCase()];
  const randomChoice = Math.floor(Math.random() * words.length);
  return words[randomChoice];
}

const lastChoices = {}
export const chooseNextVocabularyWord = (letter) => {
  const words = vocabulary[letter.toUpperCase()];
  const lastChoice = lastChoices[letter.toUpperCase()]
  console.log(lastChoice)
  if (typeof lastChoice === 'undefined') {
    console.log("undefined")
    lastChoices[letter.toUpperCase()] = 0;
    return words[0];
  }

  const nextChoice = lastChoice + 1;
  if (nextChoice >= words.length) {
    console.log("restart")
    lastChoices[letter.toUpperCase()] = 0;
    return words[0];
  }

  lastChoices[letter.toUpperCase()] = nextChoice;
  return words[nextChoice];


}
export const chooseVocabularyWord = (letter) => {
  return chooseNextVocabularyWord(letter);
};

