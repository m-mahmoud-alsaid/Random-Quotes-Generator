// Access HTML Elements
let quoteCounter = document.getElementsByTagName('span')[0];
let quote = document.getElementById('quote-txt');
let generateButton = document.getElementById('button-1');
let autoGenerateButton = document.getElementById('button-2');
let stopGenerateButton = document.getElementById('button-3');
let autoMessage = document.getElementById('auto-message');

let autoInterval;

// Using Fetch To Deal With Request  
fetch('quotes.json')
    .then((response) => {
        return response.json();
    }).then((data) => {
        // Generate Quote Button 
        generateButton.onclick = () => {
            clearInterval(autoInterval);
            autoMessage.textContent = "Auto: OFF";
            let rand = Math.floor(Math.random() * data.quotes.length);
            let quoteTxt = data.quotes[rand].quote;
            quote.textContent = quoteTxt;
            quoteCounter.textContent = rand + 1;
        };
        // Auto Generate Quote Button 
        autoGenerateButton.onclick = () => {
            clearInterval(autoInterval);
            autoInterval = setInterval(() => {
                let rand = Math.floor(Math.random() * data.quotes.length);
                let quoteTxt = data.quotes[rand].quote;
                quote.textContent = quoteTxt;
                quoteCounter.textContent = rand + 1;
            }, 3000);
            autoMessage.textContent = "Auto: ON";
        };
        // Stop Auto Generate Quote Button 
        stopGenerateButton.onclick = () => {
            clearInterval(autoInterval);
            autoMessage.textContent = "Auto: OFF";
        };
    })