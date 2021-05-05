function randomNumber(min, max) {
  let number = 0;
  do {
    number = Math.ceil(Math.random() * max);
  } while (number === min);
  return number;
}

function generateListCode() {
  let rgbCodes = [];
  for (let index = 1; index <= 3; index += 1) {
    rgbCodes.push(randomNumber(0, 254));
  }
  return rgbCodes;
}

function colorsCodeChecker(codesList) {
  for (let code in codesList) {
    let codeInt = parseInt(code);
    for (let index = codeInt + 1; index < codesList.length; index += 1) {
      if (codesList[codeInt][0] === codesList[index][0] && codesList[codeInt][1] === codesList[index][1] && codesList[codeInt] === codesList[index]) {
        return false;
      }
    }
  }
  return true;
}

function generateRGBStringList(codeAmount) {
  let rgbCodesList = [];
  let isNotEqual = false;
  do {
    rgbCodesList = [];
    for (let index = 1; index <= codeAmount; index += 1) {
      rgbCodesList.push(generateListCode());
    }
    isNotEqual = colorsCodeChecker(rgbCodesList);
  } while (!isNotEqual);
  return rgbCodesList;
}

function generateRGBColor(rgbAmount) {
  let colorsCodes = generateRGBStringList(rgbAmount);
  let colorsStringList = [];
  for (let rgbCodes of colorsCodes) {
    colorsStringList.push(`rgb(${rgbCodes[0]}, ${rgbCodes[1]}, ${rgbCodes[2]})`);
  }
  return colorsStringList;
}

function colorBox(boxAmount) {
  const colorPalette = document.querySelector('#color-palette');
  let colors = generateRGBColor(boxAmount);
  
  for (let index = 0; index < boxAmount; index += 1) {
    const box = document.createElement('div');
    box.className = 'color';
    box.style.backgroundColor = colors[index];
    colorPalette.appendChild(box);
  }
}

colorBox(4);
