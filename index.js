const block = document.querySelector('.blokc');
const cyrcle = document.querySelector('.cyrcle');
let clientX, clientY;


let base = []

let cyrcleSeting = {
    color: 'bdfy',
    clientX:0,
    clientY:0,
}
base.push(cyrcleSeting)
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function getRandomClientX(min = 0, max = 500) {
    return Math.random() * (max - min) + min
  }
  function getRandomClientY(min = 0, max = 500) {
    return Math.random() * (max - min) + min
  }

function spin(){
    console.log(base)
    clientX=getRandomClientX()
    clientY=getRandomClientY()
    let color = getRandomColor()
    let div = document.createElement('div');
    div.className = "cyrcle";
    div.style.backgroundColor = color;
    block.appendChild(div)
    div.style.marginLeft = `${clientX}px`
    div.style.marginTop = `${clientY}px`
} 
spin()







// cyrcle.style.position = 'absolute';

// block.addEventListener('mousemove', event => {
//     clientX = event.clientX;
//     clientY = event.clientY;

//     // Ограничение перемещения круга внутри блока
    

//     // Вычисление нового значения margin

//     cyrcle.style.marginLeft = `${clientX}px`;
//     cyrcle.style.marginTop = `${clientY}px`

    
// });
