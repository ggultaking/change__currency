const leftSelect = document.getElementById("left__select");
const rightSelect = document.getElementById("right__select");
const rightInput = document.getElementById("result__right");
const leftInput = document.getElementById("result__left");
const divsLeft = document.querySelectorAll("#left__currency__divs div");
const divsRight = document.querySelectorAll("#right__currency__divs div");
const resultInfoLeft = document.getElementById("value__left");
const resultInfoRight = document.getElementById("value__right");

const requestToAPI = () => {
  fetch("https://api.exchangerate.host/latest")
    .then((response) => response.json())
    .then((data) => {
      Object.keys(data.rates).forEach((item) => {
        const optionLeft = document.createElement("option");
        const optionRight = document.createElement("option");
        optionLeft.value = item;
        optionLeft.innerText = item;
        optionRight.value = item;
        optionRight.innerText = item;
        leftSelect.appendChild(optionLeft);
        rightSelect.appendChild(optionRight);
      });
    });
};

requestToAPI();

let from = "RUB";
let to = "USD";

const convertCurrency = () => {
  fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}`)
    .then((res) => res.json())
    .then((data) => {
     
        if(leftInput.value){
          rightInput.value =(leftInput.value * data.result).toFixed(4)
        }
         else{
          rightInput.value =data.result.toFixed(4)
         }
      resultInfoLeft.innerText = `1 ${from} = ${data.result} ${to}`;

      
      resultInfoRight.innerText = `1 ${to} = ${(1 / data.result).toFixed(
        6
      )} ${from}`;
      console.log(data.query);
    });
};



const updateFrom = (value) => {
  from = value;
  convertCurrency();
};
const updateTo = (value) => {
  to = value;
  convertCurrency();
};


  leftSelect.addEventListener("change", () => {
    divsLeft.forEach((d) => d.classList.remove("selected"));
    leftSelect.classList.add("selected");
   updateFrom(leftSelect.value);

  });

  rightSelect.addEventListener("change", () => {
    divsRight.forEach((d) => d.classList.remove("selected"));
    rightSelect.classList.add("selected");
    updateTo(rightSelect.value)
  });

  divsLeft.forEach((div) => {
    div.addEventListener("click", (e) => {
      if (e.target === div || div.contains(e.target)) {
        divsLeft.forEach((d) => d.classList.remove("selected"));
        div.classList.add("selected");
        updateFrom(e.target.innerText);
      }
    });
  });

  divsRight.forEach((div) => {
    div.addEventListener("click", (e) => {
      if (e.target === div || div.contains(e.target)) {
        divsRight.forEach((d) => d.classList.remove("selected"));
        div.classList.add("selected");
        updateTo(e.target.innerText);
      }
    });
  });
leftInput.addEventListener("input",()=>{
  convertCurrency()
})
  convertCurrency();

const reverseCurrency=()=>{

}

  changeButton.addEventListener("click",()=>{
    reverseCurrency();
  })