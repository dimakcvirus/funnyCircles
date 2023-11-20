const block = document.querySelector('.blokc');
const cyrcle = document.querySelector('.cyrcle');

let base = []

function add() {//функция для добавления элементов при загрузки страницы 
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
add()
add()
add()
add()
add()
function getRandomColor() { //функция генирации цвета
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function getRandomClientX(min = 0, max = 500) { //функция генирации позиции x
    return Math.random() * (max - min) + min
  }
  function getRandomClientY(min = 0, max = 500) {//функция генирации позиции y
    return Math.random() * (max - min) + min
  }

function spin(){ // функция отрисовки 
    const block = document.querySelector('.blokc');
    block.innerHTML = '';
    base.forEach(function(object){
        clientX = object.clientX
    clientY = object.clientY
    let color = object.color
    let div = document.createElement('div');
    div.className = "cyrcle";
    div.style.backgroundColor = color;
    block.appendChild(div)
    div.style.marginLeft = `${clientX}px`
    div.style.marginTop = `${clientY}px`    
    })
} 


console.log(base)
spin()



block.addEventListener('dblclick', event => { // функция добавления по клику в том месте где стоит курсор
     let cord = block.getBoundingClientRect();
     let clientX = event.clientX - cord.left;
     let clientY = event.clientY - cord.top ;
     let color = getRandomColor();

    let cyrcleSeting = {
        color: color,
        clientX: clientX,
        clientY: clientY,
    };
    base.push(cyrcleSeting);
    items = document.querySelectorAll('.cyrcle');

    
    

spin()    
});


let items = document.querySelectorAll('.cyrcle'); // получаем все элементы списка

items.forEach((item,index) => {
    item.onmousedown = function (event) {
        let shiftX = event.clientX - block.getBoundingClientRect().left;
        let shiftY = event.clientY - block.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
           let clientX = item.style.left = pageX - shiftX + 'px';
           let clientY = item.style.top = pageY - shiftY + 'px';
           base[index].clientX =  clientX
           base[index].clientY =  clientY
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        item.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            item.onmouseup = null;
        };
    };

    item.ondragstart = function () {
        return false;
    };
});










// items.forEach(item => { // добавляем обработчик события на каждый элемент списка
//     item.draggable = true;

//   item.addEventListener('mousemove', (event) => {
//     let cord = block.getBoundingClientRect(); 
//     console.log(event.clientX,event.clientY)
//     let index = Array.from(items).indexOf(item); 
//     // получаем индекс текущего элемента в массиве
//     base[index].clientX = event.clientX - cord.left;
//     base[index].clientY = event.clientY - cord.top 
//     spin()
    
//     // выводим полученное значение в консоль
//   });
// });
