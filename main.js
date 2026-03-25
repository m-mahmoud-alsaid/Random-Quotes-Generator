// Access HTML Elements
let quoteCounter = document.getElementsByTagName('span')[0];
let quote = document.getElementById('quote-txt');
let generateButton = document.getElementById('button-1');
let autoGenerateButton = document.getElementById('button-2');
let stopGenerateButton = document.getElementById('button-3');
let autoMessage = document.getElementById('auto-message');

let autoInterval;

// Using Promise To Deal With Request 
let p = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", "quotes.json");
    req.send();
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let objData = JSON.parse(this.responseText);
                resolve(objData.quotes);
            } else {
                reject(Error('Request Error.'));
            }
        }
    };
});

p.then(
    (quotesDataArr) => {
        // Generate Quote Button 
        generateButton.onclick = function () {
            clearInterval(autoInterval);
            autoMessage.textContent = "Auto: OFF";
            autoMessage.style.display = "none";
            let rand = Math.floor(Math.random() * quotesDataArr.length);
            let quoteTxt = quotesDataArr[rand].quote;
            quoteCounter.textContent = rand + 1;
            quote.textContent = quoteTxt;
        };
        // Auto Generate Quote Button 
        autoGenerateButton.onclick = function () {
            clearInterval(autoInterval);
            autoInterval = setInterval(() => {
                let rand = Math.floor(Math.random() * quotesDataArr.length);
                let quoteTxt = quotesDataArr[rand].quote;
                quoteCounter.textContent = rand + 1;
                quote.textContent = quoteTxt;
            }, 3000);
            autoMessage.textContent = "Auto: ON";
            autoMessage.style.display = "block";
        };
        // Stop Generate Quote Button 
        stopGenerateButton.onclick = function () {
            clearInterval(autoInterval);
            autoMessage.textContent = "Auto: OFF";
        };
    })
    .catch((error) => {
        console.log(error);
    });