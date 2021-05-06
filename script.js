function randomNumber(min, max) {
  let number = 0;
  do {
    number = Math.ceil(Math.random() * max);
  } while (number === min);
  return number;
}

function rgbCodeArrayGenerator() {
  const rgbCodes = [];
  for (let index = 1; index <= 3; index += 1) {
    rgbCodes.push(randomNumber(0, 254));
  }
  return rgbCodes;
}

function elementsComparator(arrayOfArrays, array01, array02, elementsIndex) {
  if (arrayOfArrays[array01][elementsIndex]
    === arrayOfArrays[array02][elementsIndex]) {
    return true;
  }
  return false;
}

function boxesColorCheckerInsideLoop(outLoopIndex, arrayLength, codesArray) {
  for (let index = outLoopIndex + 1; index < arrayLength; index += 1) {
    if (elementsComparator(codesArray, outLoopIndex, index, 0)
    && elementsComparator(codesArray, outLoopIndex, index, 1)
    && elementsComparator(codesArray, outLoopIndex, index, 2)) {
      return false;
    }
  }
  return true;
}

function boxesColorsCodesChecker(rgbAllBoxesCodesArray) {
  const listLength = rgbAllBoxesCodesArray.length;
  for (const CodesArrayIndex in rgbAllBoxesCodesArray) {
    const outLoopIndex = parseInt(CodesArrayIndex, 10);
    if (boxesColorCheckerInsideLoop(outLoopIndex,
      listLength, rgbAllBoxesCodesArray) === false) {
      return false;
    }
  }
  return true;
}

function rgbCodesArrayGenerator(boxesAmount) {
  let rgbStringArray = [];
  let isNotEqual = false;
  do {
    rgbStringArray = [];
    for (let index = 1; index <= boxesAmount; index += 1) {
      rgbStringArray.push(rgbCodeArrayGenerator());
    }
    isNotEqual = boxesColorsCodesChecker(rgbStringArray);
  } while (!isNotEqual);
  return rgbStringArray;
}

function rgbFormatArray(boxesAmount) {
  const colorsCodes = rgbCodesArrayGenerator(boxesAmount);
  const rgbFormat = [];
  for (const rgbCodes of colorsCodes) {
    rgbFormat.push(`rgb(${rgbCodes[0]}, ${rgbCodes[1]}, ${rgbCodes[2]})`);
  }
  return rgbFormat;
}

function colorsBoxesGenerator(boxesAmount) {
  const colorsPalette = document.querySelector('#color-palette');
  const colors = rgbFormatArray(boxesAmount);
  const blackBox = document.createElement('div');
  blackBox.className = 'color selected';
  blackBox.style.backgroundColor = 'rgb(0, 0, 0)';
  colorsPalette.appendChild(blackBox);
  for (let index = 0; index < boxesAmount; index += 1) {
    const box = document.createElement('div');
    box.className = 'color';
    box.style.backgroundColor = colors[index];
    colorsPalette.appendChild(box);
  }
}

colorsBoxesGenerator(3);

function linesOfPixelBoard(lineAmount) {
  const pixelBoard = document.querySelector('#pixel-board');
  for (let index = 1; index <= lineAmount; index += 1) {
    const line = document.createElement('div');
    line.className = 'line';
    pixelBoard.appendChild(line);
  }
}

linesOfPixelBoard(5);

function pixelsOfPixelBoard() {
  const lineAmount = document.getElementsByClassName('line').length;
  const lines = document.getElementsByClassName('line');
  for (let line = 0; line < lineAmount; line += 1) {
    for (let index = 0; index < lineAmount; index += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.style.backgroundColor = 'white';
      lines[line].appendChild(pixel);
    }
  }
}

pixelsOfPixelBoard();

const colorsList = document.getElementsByClassName('color');

function eventApplier(elementsList, event, action) {
  for (const element of elementsList) {
    element.addEventListener(event, action);
  }
}

function selectColor(event) {
  const currentSelected = document.querySelector('.selected');
  const eventTargeted = event.target;
  currentSelected.className = 'color';
  eventTargeted.className += ' selected';
}

eventApplier(colorsList, 'click', selectColor);

function coloringPixels(event) {
  const eventTargeted = event.target;
  const colorSelected = document.querySelector('.selected');
  if (eventTargeted.classList.contains('pixel')) {
    eventTargeted.style.backgroundColor = window.getComputedStyle(colorSelected, null)
      .getPropertyValue('background-color');
  }
}

document.addEventListener('click', coloringPixels);

function clearPixelsBoard() {
  const pixelsList = document.getElementsByClassName('pixel');
  for (const pixel of pixelsList) {
    pixel.style.backgroundColor = 'white';
  }
}

const btnClearBoard = document.getElementById('clear-board');

btnClearBoard.addEventListener('click', clearPixelsBoard);

const btnGenerateBoard = document.getElementById('generate-board');
const inputBoardSize = document.getElementById('board-size');

function resizeValueChecker(newSizeValue) {
  if (newSizeValue < 5) {
    return 5;
  } if (newSizeValue > 50) {
    return 50;
  }
  return newSizeValue;
}

function pixelsRemover() {
  const pixelsListLength = document.getElementsByClassName('line').length;
  const pixelsBoard = document.getElementById('pixel-board');
  for (let index = 0; index < pixelsListLength; index += 1) {
    pixelsBoard.removeChild(document.querySelector('.line'));
  }
}

function resizePixelsBoard() {
  if (inputBoardSize.value === '') {
    alert('Board inválido!');
  } else {
    let newSizeValue = parseInt(inputBoardSize.value, 10);
    newSizeValue = resizeValueChecker(newSizeValue);
    console.log(newSizeValue);
    pixelsRemover();
    linesOfPixelBoard(newSizeValue);
    pixelsOfPixelBoard();
    inputBoardSize.value = newSizeValue;
  }
}

btnGenerateBoard.addEventListener('click', resizePixelsBoard);
