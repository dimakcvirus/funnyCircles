let base = [];//создаю пустой массив
const countOfCircles = 25 //кол во  первоночальных кружков
const block = document.querySelector('.block');//выбираю див с блоком

console.log(base)
const circleSize = 100; // px 
const blockSize = 800; // px 

block.style.width = `${blockSize}px`;
block.style.height = `${blockSize}px`;
const blockCord = block.getBoundingClientRect();// возвращает размер элемента

const uid = function(){
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function generateBasicCircles() {
  for (let index = 0; index < countOfCircles; index++) {
    let clientX, clientY;
    let overlapping;

    do {
      clientX = getCrorectCord().x;
      clientY = getCrorectCord().y;

      overlapping = base.some((circle) => {
        const distance = Math.sqrt(
      Math.pow(clientX - circle.clientX, 2) +
          Math.pow(clientY - circle.clientY, 2)
        );
        return distance < circleSize;
      });
    } while (overlapping);

    const color = getRandomColor();

    const cyrcleSeting = {
      color: color,
      clientX: clientX,
      clientY: clientY,
      id: uid()
    };

    base.push(cyrcleSeting);
  }
}

generateBasicCircles()



function getCrorectCord() {

      clientX = getRandomCoordinate(0, blockSize - circleSize);
      clientY = getRandomCoordinate(0, blockSize - circleSize);

  return { x: Math.trunc(clientX), y: Math.trunc(clientY) };
}

function getRandomColor() { // функция рандомного цвета
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomCoordinate(min = 0, max = blockSize) { //рандомное создание корординат
       
    return Math.random() * (max  - min) + min;
}

function initFunction() {// функция проходит по массиву  и передает в рендер  для отрисовки 
  
    base.forEach((object) => {
      rendering(object)
  });

}


initFunction();

const width = document.querySelector('.cyrcle').offsetWidth //получаю ширину круга
const height = document.querySelector('.cyrcle').offsetHeight //получаю высоту круга


function rendering(cyrcleSeting) {// отрисовка кружков 
  const div = document.createElement('div');
  div.className = 'cyrcle';
  block.appendChild(div);

  const clientX = cyrcleSeting.clientX;
  const clientY = cyrcleSeting.clientY;
  const color = cyrcleSeting.color;
  const id = cyrcleSeting.id;

  div.style.backgroundColor = color;
  div.style.width = `${circleSize}px`;
  div.style.height = `${circleSize}px`;
  div.id = id;
  

  div.style.left = `${clientX}px`;
  div.style.top = `${clientY}px`;
  
}


// base = base.filter(item => item.id !== event.target.id)

const isOverlapping = (clientX, clientY) => {
  let isOverlapping = base.some((circle) => {
    const distance = Math.sqrt(
  Math.pow(clientX - circle.clientX, 2) +
      Math.pow(clientY - circle.clientY, 2)
    );
    return distance < circleSize;
  });
  return isOverlapping

}


block.addEventListener('dblclick', (event) => {// по двойному нажатию  добавление кружка
  if (event.target.className == "cyrcle") {
     for(i = 0; i < base.length; i++){
      if(event.target.id ===base[i].id){
        base.splice(i,1)
      }
     }
      event.target.remove()
      return;
  } 

  let cord = block.getBoundingClientRect();
  

  let clientX = event.clientX - cord.left - circleSize / 2;
  let clientY = event.clientY - cord.top - circleSize / 2;
  let color = getRandomColor();

 if (clientY < 0 || clientX < 0  || clientX > (blockSize -circleSize)  || clientY > (blockSize - circleSize)){
  return 
}
if (clientX > 1000) {

}

    
  if (isOverlapping(clientX,clientY) == true) {
    alert('alarma')
    return
  }
    
    const cyrcleSeting = {
      color: color,
      clientX: clientX,
      clientY: clientY,
      id: uid()
  };

  

  base.push(cyrcleSeting);
  rendering(cyrcleSeting)
  
});
function mixRgb(rgb1,rgb2){
  let r = Math.trunc(Number(rgb1[0]) + Number(rgb2[0]) / 2)
  let g = Math.trunc(Number(rgb1[1]) + Number(rgb2[1]) / 2)
  let b = Math.trunc(Number(rgb1[2]) + Number(rgb2[2]) / 2)
  if( r > 255 || g > 255 || b > 255){
     r = Math.trunc(r / 2)
     g = Math.trunc(g / 2)
     b = Math.trunc(b / 2)

  }
  return `rgb(${r}, ${g}, ${b})`
}
function moveAt(el) {// функция для вычисления новой кардинаты 
  let clientX = el.clientX - (el.target.offsetWidth / 2) - blockCord.left;
  let clientY = el.clientY - (el.target.offsetHeight / 2) - blockCord.top;
  const cord = block.getBoundingClientRect();

  if (clientX < 0) {
    clientX = 0;
  }
  if (clientY < 0) {
    clientY = 0;
  }
  if (clientX + circleSize > cord.width) {
    clientX = cord.width - el.target.offsetWidth;
  }
  if (clientY + el.target.offsetHeight > cord.height) {
    clientY = cord.height - el.target.offsetHeight;
  }

  el.target.style.left = clientX + 'px';
  el.target.style.top = clientY + 'px';
  el.target.style.zIndex = 999;
}

block.onmousedown = function(el) {

  if (el.target.className === 'cyrcle') {
    moveAt(el);

    el.target.onmousemove = function(el) {
      moveAt(el);
      const circleId = el.target.id;
      const circleIndex = base.findIndex((circle) => circle.id === circleId);
        if (circleIndex !== -1) {
            base[circleIndex].clientX = clientX
            base[circleIndex].clientY = clientY
        }
    }

    el.target.onmouseup = function(el) {

      el.target.style.display = 'none'
      let elemBelow = document.elementFromPoint(el.clientX, el.clientY)
      console.log('bbbbellow',elemBelow.style)
      if (elemBelow.className === 'cyrcle') {

        let circle_one = el.target.style.backgroundColor
        let circle_two = elemBelow.style.backgroundColor
        const rgb1 = circle_one.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1)
        const rgb2 = circle_two.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1)
        
        base.forEach(function(element, index){
          if(el.target.id === element.id){
             base.splice(index,1)
            
            
          }
          if(elemBelow.id === element.id){
            base.splice(index,1)
          }
        })
      
        el.target.remove()
        elemBelow.remove()
      
        
        const cyrcleSeting = {
          color: mixRgb(rgb1, rgb2),
          clientX: parseInt(elemBelow.style.left),
          clientY: parseInt(elemBelow.style.top),
          id: uid()
      };
      
      rendering(cyrcleSeting)
    
      base.push(cyrcleSeting);
 
      }
      console.log(elemBelow)
      el.target.style.display = 'block'
      el.target.onmousemove = null;
      el.target.onmouseup = null;
      el.target.style.zIndex = 1;
    }
  }
}

block.ondragstart = function() {
  return false;
};
