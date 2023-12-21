
const cyrcle = document.querySelector('.cyrcle');
// console.dir(cyrcle);

const block = document.querySelector('.block');
let base = [];
const countCyrcle = 40
const cyrcleWidth = cyrcle.offsetWidth
const cyrcleHeight = cyrcle.offsetHeight

function add() {
    let clientX = getRandomClientX();
    let clientY = getRandomClientY();
    let color = getRandomColor();

    const cyrcleSeting = {
        color: color,
        clientX: clientX,
        clientY: clientY,
    };

    base.push(cyrcleSeting);
}
for (i = 0; i <= countCyrcle; i++){
add()
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomClientX(min = 0, max = 500) {
  return Math.random() * (max - min - cyrcleHeight) + min;
}

function getRandomClientY(min = 0, max = 500) {
  return Math.random() * (max - min - cyrcleWidth ) + min;
}


function spin() {
    const block = document.querySelector('.block');
    block.innerHTML = '';
    base.forEach(function (object) {
        const clientX = object.clientX;
        const clientY = object.clientY;
        let color = object.color;
        let div = document.createElement('div');
        div.className = 'cyrcle';
        div.style.backgroundColor = color;
        div.style.left = `${clientX}px`;
        div.style.top = `${clientY}px`;
        block.appendChild(div);
    });

    const items = document.querySelectorAll('.block');
}
spin()

block.addEventListener('dblclick', (event) => {
    let cord = block.getBoundingClientRect();
    let clientX = event.clientX - cord.left;
    let clientY = event.clientY - cord.top;
    let color = getRandomColor();

    let cyrcleSeting = {
        color: color,
        clientX: clientX,
        clientY: clientY,
    };
    base.push(cyrcleSeting);


    spin();
});

block.addEventListener("mousemove", (e) => {

});

cyrcle.onmousedown = function(e) { // 1. отследить нажатие

  // подготовить к перемещению
  // 2. разместить на том же месте, но в абсолютных координатах
  moveAt(e);
  // переместим в body, чтобы мяч был точно не внутри position:relative
  // document.body.appendChild(cyrcle);

  cyrcle.style.zIndex = 1000; // показывать мяч над другими элементами

  // передвинуть мяч под координаты курсора
  // и сдвинуть на половину ширины/высоты для центрирования
  function moveAt(e) {
    const cord = block.getBoundingClientRect();
    const offsetX = cyrcle.offsetWidth / 2;
    const offsetY = cyrcle.offsetHeight / 2;
  
    let clientX = e.pageX - cord.left - offsetX;
    let clientY = e.pageY - cord.top - offsetY;
  
    // Ограничиваем координаты, чтобы элемент не выходил за границы
    if (clientX < 0) {
      clientX = 0;
    }
    if (clientY < 0) {
      clientY = 0;
    }
    if (clientX + cyrcle.offsetWidth > cord.width) {
      clientX = cord.width - cyrcle.offsetWidth;
    }
    if (clientY + cyrcle.offsetHeight > cord.height) {
      clientY = cord.height - cyrcle.offsetHeight;
    }
  
    cyrcle.style.left = clientX + 'px';
    cyrcle.style.top = clientY + 'px';
  }
          

  // 3, перемещать по экрану
  block.onmousemove = function(e) {
    
  
    moveAt(e);
  }

  // 4. отследить окончание переноса
  cyrcle.onmouseup = function() {
    block.onmousemove = null;
    cyrcle.onmouseup = null;
  }
}

cyrcle.ondragstart = function() {
  return false;
};
block.addEventListener('click', (event) => {
  const cord = block.getBoundingClientRect();
  const clickX = event.clientX - cord.left;
  const clickY = event.clientY - cord.top;

  base.forEach((item, index) => {
    const distance = Math.sqrt((clickX - item.clientX) ** 2 + (clickY - item.clientY) ** 2);
    const radius = cyrcle.offsetWidth / 2;

    if (distance <= radius) {
      // Удаляем элемент из массива по индексу
      base.splice(index, 1);
    }
  });

  spin();
});