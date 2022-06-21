const count = 112;
const sortingType = 'merge';

let width = document.body.clientWidth;
let height = document.body.clientHeight;

function fillRect(x, y, width, height, color) {
    const element = document.createElement('div');
    document.getElementById('main').appendChild(element); 
    element.style.transform = `translate(${x}px, ${y}px)`;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.backgroundColor = color;
    element.style.position = 'absolute';
    element.style.margin = 0;
    element.setAttribute('class', 'rect');
    return element;
}

let numbers = [];
function shuffleNumbers() {
    const step = height / count;
    numbers = [];
    while(numbers.length < count){
        const r = Math.floor((Math.random() * count));
        if(numbers.indexOf(r) === -1) numbers.push(r);
    }
    //console.log(numbers);
}

//let recc = 1;
function clearRectangles() {
    //recc = 1;
    const rectangles = document.getElementsByClassName('rect');
    while (rectangles.length > 0) {
        //logging each removed rectangle
        //console.log('removed: ' + rectangles[0] + ' X' + recc);
        //recc++;

        rectangles[0].remove();
    }
}

//fixing the window constants
setInterval(() => {
    if (width != document.body.clientWidth) {
        width = width = document.body.clientWidth;
        drawNumbers();
    }
    if (height != document.body.clientHeight) {
        height = document.body.clientHeight;
        drawNumbers();
    }
}, 
1);


function drawNumbers() {
    if (document.getElementsByClassName('rect').length > 0) {
        //logging clearning rectangles
        //console.log('clearing ' + document.getElementsByClassName('rect').length + ' rectangles...');'

        clearRectangles();

        //console.log('cleared!');
    }
    const rectWidth = width / numbers.length;
    const numberScalar = height / count;
    //console.log(numberScalar);
    //logging generating rectangles
    //console.log('generating...');
    for (let i = 0; i < numbers.length; i++) {
        fillRect(i*rectWidth,height-(numbers[i]*numberScalar),rectWidth+1,numbers[i]*numberScalar+1,'black');
        //logging each rectangle removed
        //console.log(i + '=' + numbers[i]);
    }
    //console.log('generated!');
}

shuffleNumbers();
drawNumbers();
let sorted = false;
let sortIteration = 0;

//on click
document.getElementById('main').addEventListener('click', () => {
    if (!sorted) {
        sort();
    } else {
        alert('Sorted!');
        shuffleNumbers();
        drawNumbers();
        sorted = false;
        sortIteration = 0;
    }
});

function sort() {
    if (sortingType === 'selection') {
        let min = numbers[sortIteration];
        let minIndex = sortIteration;
        for (let i = sortIteration; i < numbers.length; i++) {
            if (numbers[i] < min) {
                min = numbers[i];
                minIndex = i;
            }
        }
        temp = numbers[sortIteration];
        numbers[sortIteration] = min;
        numbers[minIndex] = temp;
        sortIteration++;
        //if sortIteration is 2 less than the length we have sorted the last element
        //EX: If penultimate element is sorted, the last element is also sorted because that would be a swap onto itself
        //penultimate element's sortIteration is the length - 2 but we incremente sortIteration by 1 before the check so ya. 
        if (sortIteration === numbers.length - 1) {
            sorted = true;
        }
        drawNumbers();
    }
    if (sortingType === 'insertion') {
        const key = numbers.splice(sortIteration + 1, 1)[0];
        for (let i = sortIteration + 1; i >= 0; i--) {
            //if i === 0 that means that key is not greater than element 0 so insert it at index 0
            //if key > the element before the index, insert it at the index
            if (i === 0 || key > numbers[i-1]) {
                numbers.splice(i,0,key);
                i = -1;
                //console.log(numbers);
            }
        }
        sortIteration++;
        //if the sortIteration + 1 (we are always starting at 1 with insertion sort) === numbers.length it is sorted. 
        //EX: 8 elements in the list. When sortIteration is 6 (we can think of this as index 7) we are sorting the last element in the array.
        //sortIteration (=6)    sortIteration++ (=7)    ( sortIteration + 1 (=8) === numbers.length(=8) ) (=true)
        if (sortIteration + 1 === numbers.length) { 
            sorted = true;
            //console.log(sorted);
        }
        drawNumbers();
    }
    if (sortingType === 'bubble') {
        let swaps = false;
        for (let i = 0; i < numbers.length-(sortIteration + 1); i++) {
            //each iteration, the highest number is sorted by getting swapped to the end
            if (numbers[i] > numbers[i+1]) {
                console.log('swapping ' + numbers[i] + ' & ' + numbers[i+1]);
                [numbers[i],numbers[i+1]] = [numbers[i+1],numbers[i]];
                swaps = true;
            }
        }
        sortIteration++;
        //withh bubble sort we do length-1 iterations
        //EX 8 elements in the list. When sort iterations is 1 here, the first element is sorted. 
        //When sort iterations is n here the nth element is sorted but that's redundant because it'll be be sorted by the swap before it
        //if (sortIteration + 1 === numbers.length) {
        //    sorted = true;
        //    console.log('sorted!');
        //}
        
        //if there are no swaps the array is sorted.
        if (!swaps) {
            sorted = true;
            console.log('sorted!');
        }
        drawNumbers();
    }
    if (sortingType === 'merge') {
        
    }
    //TODO: MERGE SORT, QUICK SORT, HEAP SORT?
}

//document.addEventListener('keydown', (event) => { 
//        switch(event.key) {
//            case "w" : y-=stepY;
//            break;
//            case "a" : x-=stepX;
//            break;
//            case "s" : y+=stepY;
//            break;
//            case "d" : x+=stepX;
//            break;
//        }
//        document.querySelector('div').style.transform = `translate(${x}px, ${y}px)`;
//    } 
//);
//console.log(document.body.clientWidth);
//console.log(document.body.clientHeight);