"use strict";
const quantitySorter = document.getElementById("number");
const beginSort = document.getElementById("beggin");
const endSort = document.getElementById("end");
const form = document.querySelector("form");
const numericOnly = document.getElementsByClassName("numericOnly");
const repeatNumber = document.getElementById("sorter");
let formArea = document.querySelector(".formArea");
let resultArea = document.querySelector(".number-sorters");
let buttonAgain = document.querySelector(".sorter-again");
let button = document.querySelector(".number-sorters button");
button.style.display = "none";

const regexOnlyNumbers = /[^0-9]/g;

quantitySorter.oninput = function () {
  quantitySorter.value = quantitySorter.value.replace(regexOnlyNumbers, "");
};

beginSort.oninput = function () {
  beginSort.value = beginSort.value.replace(regexOnlyNumbers, "");
};

endSort.oninput = function () {
  endSort.value = endSort.value.replace(regexOnlyNumbers, "");
};

form.onsubmit = function (event) {
  try {
    event.preventDefault();

    if (Number(beginSort.value) > Number(endSort.value)) {
      alert("O valor inicial não pode ser maior que o valor final");
      throw new Error("O valor inicial deve ser menor que o valor final");
    }

    if (
      beginSort.value === "" ||
      endSort.value === "" ||
      quantitySorter.value === ""
    ) {
      alert("Preencha os campos numéricos");
      throw new Error("Campos obrigatórios vazios");
    }

    draw();
  } catch (error) {
    console.log("Erro de envio do formulário:", error);
  }
};

const generateNumbersNoRepeat = (min, max, quantity) => {
  let randomSortedNumbers = new Array();
  for (let i = 0; i < quantity; i++) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    randomSortedNumbers.includes(randomNumber)
      ? (i -= 1)
      : randomSortedNumbers.push(randomNumber);
  }

  return randomSortedNumbers;
};

const generateNumbers = (min, max, quantity) => {
  let randomSortedNumbers = new Array();
  for (let i = 0; i < quantity; i++) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    randomSortedNumbers.push(randomNumber);
  }

  return randomSortedNumbers;
};

function displayNumbers(numbers) {
  formArea.style.display = "none";
  resultArea.style.display = "flex";
  let container = document.querySelector(".draw-numbers-container");
  button.style.display = "none";

  numbers.forEach((nums, index) => {
    setTimeout(() => {
      let animationDiv = document.createElement("div");
      animationDiv.className = "number-container";

      let span = document.createElement("span");
      span.innerText = nums;

      animationDiv.appendChild(span);
      container.appendChild(animationDiv);
    }, index * 4000);
    if(index === numbers.length - 1) {
      setTimeout(() => {
        button.style.display = "flex";
      }, (index + 1) * 4000);
    }
  });

  
}

function draw() {
  try {
    const Sorter = {
      id: new Date().getTime(),
      quantity: quantitySorter.value,
      beggin: beginSort.value,
      end: endSort.value,
      repeat: repeatNumber.checked,
    };

    let min = Number(Sorter.beggin);
    let max = Number(Sorter.end);
    let quantity = Number(Sorter.quantity);

    let pickedNumber = repeatNumber.checked
      ? generateNumbers(min, max, quantity)
      : generateNumbersNoRepeat(min, max, quantity);

    displayNumbers(pickedNumber);
  } catch (error) {
    console.error("Error drawing the sorter:", error);
  }
}

buttonAgain.onclick = function () {
  formArea.style.display = "initial";
  resultArea.style.display = "none";

  let container = document.querySelector(".draw-numbers-container");
  container.innerHTML = ""; // Clear the previous numbers
};
