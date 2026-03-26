// Access HTML Elements
let quoteCounter = document.getElementsByTagName('span')[0];
let quote = document.getElementById('quote-txt');
let generateButton = document.getElementById('button-1');
let autoGenerateButton = document.getElementById('button-2');
let stopGenerateButton = document.getElementById('button-3');
let autoMessage = document.getElementById('auto-message');

let autoInterval;

// Functions  
async function getData() {
    let response = await fetch('quotes.json');
    let data = await response.json();
    return data;
};

async function generateQuote() {
    let q = await getData();
    let rand = Math.floor(Math.random() * q.quotes.length);
    let gQuote = q.quotes[rand].quote;
    quote.textContent = gQuote;
    quoteCounter.textContent = rand + 1;
};

async function autoGenerateQuote() {
    clearInterval(autoInterval);
    autoInterval = setInterval(generateQuote, 3000);
    autoMessage.textContent = "Auto: ON";
};

async function stopAutoGenerateQuote() {
    clearInterval(autoInterval);
    autoMessage.textContent = "Auto: OFF";
};


// Events 
generateButton.onclick = generateQuote;
autoGenerateButton.onclick = autoGenerateQuote;
stopGenerateButton.onclick = stopAutoGenerateQuote;