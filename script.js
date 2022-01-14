const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16
const blackBtn = document.querySelector('.blackBtn')
const rainbowBtn = document.querySelector('.rainbowBtn')
const clearBtn = document.querySelector('.clearBtn')
const sizeSlider = document.getElementById('sizeSlider')
const sizeValue = document.getElementById('sizeValue')
const grid = document.getElementById("grid")
const eraseBtn = document.querySelector('.eraseBtn')

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE


function setCurrentColor(newColor){
    currentColor = newColor
}

function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

blackBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
eraseBtn.onclick = () => setCurrentMode('eraser')
clearBtn.onclick = () => restartGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    restartGrid()
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

function restartGrid() {
    clearGrid()
    setUpGrid(currentSize)
}

function clearGrid() {
    grid.innerHTML = ""
}

function setUpGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.addEventListener('mouseover', changeColor)
        grid.appendChild(gridElement)
    }
}


function changeColor(e) {
   if (currentMode === 'rainbow') {
       let randomR = Math.floor(Math.random()*256)
       let randomG = Math.floor(Math.random()*256)
       let randomB = Math.floor(Math.random()*256)
       e.target.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`
   }else if (currentMode === 'color') {
       e.target.style.backgroundColor = currentColor
   }else if (currentMode === 'eraser') {
       e.target.style.backgroundColor = '#fefefe'
   }
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active')
    }else if (currentMode === 'color') {
        blackBtn.classList.remove('active')
    }else if (currentMode === 'eraser') {
        eraseBtn.classList.remove('active')
    }

    if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active')
    }else if (newMode === 'color'){
        blackBtn.classList.add('active')
    }else if (newMode === 'eraser') {
        eraseBtn.classList.add('active')
    }
}

window.onload = () => {
    setUpGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
}



