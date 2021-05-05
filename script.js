function randomNumber(min, max) {
  let number = 0;
  do {
    number = Math.ceil(Math.random() * max);
  } while (number === min);
  return number;
}

function colorBox() {
  const colorPalette = document.querySelector('#color-palette');
  // let box = document.createElement('div');
  // box.className = 'color';

  for (let index = 0; index < 4; index += 1) {
    const box = document.createElement('div');
    box.className = 'color';
    console.log(randomNumber(0, 255));
    box.style.backgroundColor = `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`;
    colorPalette.appendChild(box);
  }
}

colorBox();
