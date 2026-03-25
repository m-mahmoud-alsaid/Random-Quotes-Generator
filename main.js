// Access HTML Elements
let quoteCounter = document.getElementsByTagName('span')[0];
let quoteBox = document.getElementById('quote-box');
let quote = document.getElementById('quote-txt');
let generateButton = document.getElementById('button-1');

// Create Quote Counter
let counter = Number(quoteCounter.textContent);

// Create Random Numbers Generator Function
let generateRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Create And Send Request
let req = new XMLHttpRequest();
req.open("GET", "quotes.json");
req.send();

// Create Object Data
let objData;

// IF Request And Response Success Display Quotes
req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        // Create Object Data
        objData = JSON.parse(this.responseText);
    }
};

// Generate Quote When Click On Generate Quote Button 
generateButton.onclick = function () {
    // Check If objData Is Defined
    if (!objData) return;

    // Create Random Number
    let rndNumber = generateRandom(0, objData.quotes.length);

    // Increase Quote Counter 
    counter++;

    // Add Quote To Quote Field 
    let quoteTxt = document.createTextNode(objData.quotes[rndNumber].quote);
    quote.textContent = '';
    quote.appendChild(quoteTxt);

    // Change Counter
    let counterTxt = document.createTextNode(counter);
    quoteCounter.textContent = '';
    quoteCounter.appendChild(counterTxt);
};