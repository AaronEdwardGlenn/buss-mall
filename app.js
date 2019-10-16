//// global variables

let assetArray = []; 
let numRuns = 0; 
let currentSpin = [21, 21, 21]; 
let previousSpin = []; 
let chartLables = []; 
let clickData = [];
let assetShowingInput = [];
let resultPercentage = []; 


/// dom manipulation 
let asset1 = document.getElementById('asset1'); 
let asset2 = document.getElementById('asset2'); 
let asset3 = document.getElementById('asset3'); 
let assetDisplay = document.getElementById('assetDisplay');
let chart_render = document.getElementById('chart_render');
let reveal_button = document.getElementById('reveal-button');

///// We are constructing the image objects here

function ProductArrayCreator(assetName, assetPath, timesShown, clicks) {
    this.assetName = assetName; 
    this.assetPath = assetPath; 
    this.timesShown = timesShown; 
    this.clicks = clicks; 
    assetArray.push(this); 

}

//// call constructor 

new ProductArrayCreator('bag', 'images/bag.jpg', 0, 0);
new ProductArrayCreator('banana', 'images/banana.jpg', 0, 0);
new ProductArrayCreator('bathroom', 'images/bathroom.jpg', 0, 0);
new ProductArrayCreator('boots', 'images/boots.jpg', 0, 0);
new ProductArrayCreator('breakfast', 'images/breakfast.jpg', 0, 0);
new ProductArrayCreator('bubblegum', 'images/bubblegum.jpg', 0, 0);
new ProductArrayCreator('chair', 'images/chair.jpg', 0, 0);
new ProductArrayCreator('cthulhu', 'images/cthulhu.jpg', 0, 0);
new ProductArrayCreator('dog-duck', 'images/dog-duck.jpg', 0, 0);
new ProductArrayCreator('dragon', 'images/dragon.jpg', 0, 0);
new ProductArrayCreator('pen', 'images/pen.jpg', 0, 0);
new ProductArrayCreator('pet-sweep', 'images/pet-sweep.jpg', 0, 0);
new ProductArrayCreator('scissors', 'images/scissors.jpg', 0, 0);
new ProductArrayCreator('shark', 'images/shark.jpg', 0, 0);
new ProductArrayCreator('sweep', 'images/sweep.png', 0, 0);
new ProductArrayCreator('tauntaun', 'images/tauntaun.jpg', 0, 0);
new ProductArrayCreator('unicorn', 'images/unicorn.jpg', 0, 0);
new ProductArrayCreator('usb', 'images/usb.gif', 0, 0);
new ProductArrayCreator('water-can', 'images/water-can.jpg', 0, 0);
new ProductArrayCreator('wine-glass', '../images/wine-glass.jpg', 0, 0);

let setLocalStorage = function() {
    clickData = JSON.parse(localStorage.getItem('clickData'));
    if (!clickData) {
        clickData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    assetShowingInput = JSON.parse(localStorage.getItem('assetShowingInput'));
    if (!assetShowingInput) {
        assetShowingInput = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    resultPercentage = JSON.parse(localStorage.getItem('resultPercentage'));
    if (!resultPercentage) {
        resultPercentage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
};

let randomNumberCreator = function() {
    return Math.floor(Math.random() * (assetArray.length));  
};

let threeRandomNumbersCreator = function() { 
    let spin = 0; 
    previousSpin = currentSpin; 
    currentSpin = []; 
    while (spin < 3) {
        let differentSpinResult = true; 
        let newSpin = randomNumberCreator(); 
        for (let i = 0; i < 3; i++) {
            if (currentSpin[i] === newSpin) {
                differentSpinResult = false; 
                break; 
            }
        
            else if (previousSpin[i] === newSpin) {
                differentSpinResult = false;
                break;
            }
        }
        if (differentSpinResult) {
            spin++;
            currentSpin.push(newSpin); 
        }
    }

}; 

function showAssetsToUser() {
    asset1.src = assetArray[currentSpin[0]].assetPath;
    assetArray[currentSpin[0]].timesShown++;  
    asset2.src = assetArray[currentSpin[1]].assetPath;
    assetArray[currentSpin[1]].timesShown++;  
    asset3.src = assetArray[currentSpin[2]].assetPath;
    assetArray[currentSpin[2]].timesShown++;  
    createChartData(); 
} 

function countInput(clickStorage) {
    let splitOne = clickStorage.split('images/')[1];
    let splitTwo = splitOne.split('.')[0];
    for (let i = 0; i < assetArray.length; i++) {
        if (splitTwo === assetArray[i].assetName) {
            assetArray[i].clicks++;
        }
    }
    createChartData();
}

function displayAssets(event) {
    if (event.target.src) {
        threeRandomNumbersCreator();
        showAssetsToUser();
        numRuns++;
        countInput(event.target.src);
    }
    if (numRuns > 24) {
        assetDisplay.removeEventListener('click', displayAssets);
        
        document.getElementById('reveal-button').style.display = 'block';
    }
}

assetDisplay.addEventListener('click', displayAssets);
reveal_button.addEventListener('click', displayChartButton);


function createChartData() {

    for (let i = 0; i < assetArray.length; i++){

        chartLables[i] = assetArray[i].assetName; 
        clickData[i] += assetArray[i].clicks; 
        assetArray[i].clicks = 0; 
        assetShowingInput[i] += assetArray[i].timesShown; 
        assetArray[i].timesShown = 0; 
        
        if (assetShowingInput[i] === 0 || clickData[i] === 0){
            resultPercentage[i] = 0;
        } else {
            resultPercentage[i] = Math.floor((clickData[i] / assetShowingInput[i]) * 100); 
        }
    }
    
    localStorage.setItem('clickData', JSON.stringify(clickData)); 
    localStorage.setItem('assetShowingInput', JSON.stringify(assetShowingInput)); 
    localStorage.setItem('resultPercentage', JSON.stringify(resultPercentage)); 
} 

function renderChart() {
    let chartDataObject = {
        labels: chartLables,
        datasets: [
            {
                label: 'Clicks',
                backgroundColor: '#CE9023',
                data: clickData,
                options: {
                    beginAtZero: true,
                    animateScale: true,
                }
            },
            {
                label: 'Times Shown',
                backgroundColor: '#CE9023',
                data: assetShowingInput,
                options: {
                    beginAtZero: true,
                    animateScale: true,
                }
            },
            {
                label: 'Percentage',
                backgroundColor: '#CE9023',
                data: resultPercentage,
                options: {
                    beginAtZero: true,
                    animateScale: true,
                }
            }
        ]
    };
    let ctx = chart_render.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: chartDataObject,
        options: {
            responsive: false
        },
    });
}

function displayChartButton() {
    renderChart(); 
    chart_render.style.display = 'block'; 
}

setLocalStorage();
threeRandomNumbersCreator();
showAssetsToUser();
