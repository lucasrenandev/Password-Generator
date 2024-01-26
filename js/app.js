// Strict mode
// Modo estrito
"use strict";

// Selecting elements 
// Selecionando elementos 
const modalBox = document.querySelector("#modal-box");
const modalText = document.querySelector("#modal-text");
const passlength = document.querySelector("#length");
const info = document.querySelector("#info");
const copyPassword = document.querySelector("#copy-password");
const range = document.querySelector("#range");
const rangeLength = document.querySelector("#counter");
const lowerCaseCheck = document.querySelector("#lowercase");
const upperCaseCheck = document.querySelector("#uppercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const generateButton = document.querySelector("#generate-button");

// Password initial text
// Texto inicial da senha
info.textContent = "Password here...";

// Initial password length
// Comprimento inicial da senha
rangeLength.textContent = +range.value;
passlength.textContent = 0;

// Adding event when changing password length
// Adicionando evento ao alterar o comprimento da senha
range.addEventListener("change", function() {
    rangeLength.textContent = +range.value;
});

// Adding event when clicking on password length change element
// Adicionando evento ao clicar no elemento de alteração do comprimento da senha
range.addEventListener("mousedown", function() {
    range.classList.add("drag");
});

// Adding event when releasing mouse click on password length change element
// Adicionando evento ao liberar o clique do mouse no elemento de alteração do comprimento da senha
range.addEventListener("mouseup", function() {
    range.classList.remove("drag");
});

// Function to get lowercase letters
// Função para obter letras minúsculas
function getLowerCaseLetters() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

// Function to get uppercase letters
// Função para obter letras maiúsculas
function getUpperCaseLetters() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

// Function to get numbers
// Função para obter números
function getNumbers() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

// Function to get symbols
// Função para obter símbolos
function getSymbols() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 33);
};

// Creating object and assigning functions
// Criando objeto e atribuindo funções
const functions = {
    lowercase: getLowerCaseLetters,
    uppercase: getUpperCaseLetters,
    numbers: getNumbers,
    symbols: getSymbols
};

// Variable to copy password
// Variável para copiar senha
let copyPass = "";

// Function to generate password
// Função para gerar senha
function generatePassword(lowercase, uppercase, numbers, symbols, passwordLength) {
    let password = "";
    const typeOfFunctions = lowercase + uppercase + numbers + symbols;
    const functionsTypeArray = [{lowercase}, {uppercase}, {numbers}, {symbols}].filter((item) => Object.values(item)[0]);

    if(typeOfFunctions === 0) {
        modalBox.classList.add("open");
        modalText.textContent = "Select a box!"
        setTimeout(function() {
            modalBox.classList.remove("open");
        }, 2500);
        passlength.textContent = 0;
        copyPass = "";
        return info.textContent = "Password here...";
    }
    else {
        for(let i = 0; i < passwordLength; i += typeOfFunctions) {
            functionsTypeArray.forEach((type) => {
                const functionName = Object.keys(type)[0];
                password += functions[functionName]();
            });
        };
        copyPass = password.slice(0, passwordLength);
        passlength.textContent = copyPass.length;
        return info.textContent = password.slice(0, passwordLength);
    };
};

// Function to copy password
// Função para copiar senha
copyPassword.addEventListener("click", function() {
    if(info.textContent === copyPass) {
        modalBox.classList.add("open");
        modalText.textContent = "Password copied successfully!";
        setTimeout(function() {
            modalBox.classList.remove("open");
        }, 2500);
    }
    else {
        modalBox.classList.add("open")
        modalText.textContent = "Generate a password!";
        setTimeout(function() {
            modalBox.classList.remove("open");
        }, 2500);
    };
    return navigator.clipboard.writeText(copyPass);
});

// Adding event when clicking generate password button
// Adicionando evento ao clicar no botão de gerar senha
generateButton.addEventListener("click", function() {
    const passwordLength = +range.value; 
    const lowercase = lowerCaseCheck.checked;
    const uppercase = upperCaseCheck.checked;
    const numbers = numbersCheck.checked;
    const symbols = symbolsCheck.checked;

    info.textContent = generatePassword(lowercase, uppercase, numbers, symbols, passwordLength);
});