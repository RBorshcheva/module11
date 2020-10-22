// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
//mainweight field
const minWeightInput = document.querySelector('.minweight__input');
let minWeight;
//max weight field
const maxWeightInput = document.querySelector('.maxweight__input');
let maxWeight;
// array of color priority for color comparison
const priorityColor = {
  "фиолетовый": 0,
  "зеленый": 1,
  "алый": 2,
  "желтый": 3,
  "коричневый": 4
};

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  fruitsList.innerHTML = "";
  for (let i = 0; i < fruits.length; i++) {
    var cardText = document.createElement('li');
    cardText.innerHTML = `Фрукт №${i+1}`+ `<br>` + fruits[i].kind +`<br>`+ fruits[i].color +`<br>`+ `Вес: ${fruits[i].weight}кг`;
    function colorOutput(color, typeColor){
      //sort due to the color of product 
      if (fruits[i].color == color) {
        cardText.className = typeColor;
      }
    };
    colorOutput("фиолетовый", "fruit__item fruit_violet");
    colorOutput("зеленый", "fruit__item fruit_green");
    colorOutput("алый", "fruit__item fruit_carmazin");
    colorOutput("желтый", "fruit__item fruit_yellow");
    colorOutput("кричневый", "fruit__item fruit_lightbrown");    
    fruitsList.appendChild(cardText);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  while (fruits.length > 0) {
    //taking random index of array
    let randi = getRandomInt(0, fruits.length-1);
    //put the element with chosen index in resulting array
    result.push(fruits[randi]);
    //delete the element with chosen index from the origin array
    fruits.splice(randi,1);
  }

  fruits = result;

  //check the condition that the sequence of the array has changed 
  const shuffle_check = fruits.every((element, index) =>  element == fruits_old[index]);
  if (shuffle_check) {
    alert("Порядок элементов не изменился")
  };
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// filtering an array
const filterFruits = () => {
  fruits.filter((item) => {
    return fruits.filter((i) => {
    return ((i.weight >= minWeight) && (i.weight <= maxWeight));
    });
  });

//getting value of filter fields
filterButton.addEventListener('click', () => {
  if ((minWeightInput.value != "") && (maxWeightInput.value !="")) {
    minWeight = parseInt(minWeightInput.value);
    maxWeight = parseInt(maxWeightInput.value);
    fruits = filterFruits();
  display();
  }
  else {
  alert ('Значения фильтрации не заданы')
};
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

//comaparation by two colors
const comparationColor = (a, b) => {
  return priorityColor[fruit1.color] > priorityColor[fruit2.color];
};

// partition function
function partition(arr, left, right) {
  var pivot = arr[Math.floor((right + left) / 2)],
      i = left,
      j = right;
  while (i <= j) {
      while (comparation(pivot, arr[i])) {
          i++;
      }
      while (comparation(arr[j], pivot)) {
          j--;
      }
      if (i <= j) {
          swap(arr, i, j);
          i++;
          j--;
      }
  }
  return i;
};

const sortAPI = {
  //bubble sorting realisation from the studing matherials
  bubbleSort(arr, comparation) {
    const n = arr.length;
    for (let i = 0; i < n-1; i++) { 
       for (let j = 0; j < n-1-i; j++) { 
           if (comparation(arr[j], arr[j+1])) { 
               let temp = arr[j+1]; 
               arr[j+1] = arr[j]; 
               arr[j] = temp; 
           }
       }                    
    }
  },
  };

  //quick sort realisation from the studing matherials
  quickSort(items, left, right)
  {
    var index;
   if (items.length > 1) {
       left = typeof left != "number" ? 0 : left;
       right = typeof right != "number" ? items.length - 1 : right;
       index = partition(items, left, right);
       if (left < index - 1) {
           quickSort(items, left, index - 1);
       }
       if (index < right) {
           quickSort(items, index, right);
       }
   }
   return items;
}
},

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

//change sort type
sortChangeButton.addEventListener('click', () => {
  if(sortKind == 'bubbleSort'){
    sortKind = 'quickSort';
  }else {
    sortKind = 'bubbleSort';
  };
  sortKindLabel.textContent = sortKind;
  sortTime = '-';
  sortTimeLabel.textContent = sortTime;
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/
//adding the fruit
addActionButton.addEventListener('click', () => {
  let weightInputNumber = parseFloat(weightInput.value);
  let result = {"kind": kindInput.value, "color": colorInput.value, "weight": weightInputNumber};
  if((kindInput.value == "") || (colorInput.value == "") || (weightInput.value == "")){
    alert("Введите все данные!!!");
  }else if((isNaN(weightInputNumber))){
    alert("Введите в поле weight число!!!");
  }else {
    fruits.push(result);  
  };
  display();
});
