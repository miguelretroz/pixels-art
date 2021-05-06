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
    const outLoopIndex = parseInt(CodesArrayIndex);
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
  const rgbFormatArray = [];
  for (const rgbCodes of colorsCodes) {
    rgbFormatArray.push(`rgb(${rgbCodes[0]}, ${rgbCodes[1]}, ${rgbCodes[2]})`);
  }
  return rgbFormatArray;
}

function colorsBoxesGenerator(boxesAmount) {
  const colorsPalette = document.querySelector('#color-palette');
  const colors = rgbFormatArray(boxesAmount);
  const blackBox = document.createElement('div');
  blackBox.className = 'color';
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
