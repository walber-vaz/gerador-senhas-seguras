const input = document.querySelector('[data-js="input-password"]');
const btn = document.querySelector('[data-js="btn"]');
const range = document.querySelector('[data-js="input-range"]');
const copyPassword = document.querySelector('[data-js="copy-password"]');
const btnCopy = document.querySelector('[data-js="btn-copy"]');
const btnGen = document.querySelector('[data-js="btn-gen"]');
const upCheck = document.querySelector('[data-js="up-check"]');
const numCheck = document.querySelector('[data-js="num-check"]');
const symCheck = document.querySelector('[data-js="sym-check"]');
const lenPassword = document.querySelector('[data-js="length-password"]');
const checkSec = document.querySelector('[data-js="check-security"]');

let passwordLength = 16;

const generationPassword = () => {
  const chars = [];
  const charSet = new Set();

  if (upCheck.checked) {
    chars.push(...'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    charSet.add('A');
  }
  if (numCheck.checked) {
    chars.push(...'0123456789');
    charSet.add('0');
  }
  if (symCheck.checked) {
    chars.push(...'!@#$%&*()_+[]{};:.,?/|');
    charSet.add('!');
  }
  chars.push(...'abcdefghijklmnopqrstuvwxyz');

  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    let random;
    do {
      random = chars[Math.floor(Math.random() * chars.length)];
    } while (charSet.has(random) && charSet.size === passwordLength);
    password += random;
  }
  input.value = password;
  calculateQuantity();
  calculateFontSize();
};

const calculateQuantity = () => {
  const hasUpper = upCheck.checked;
  const hasNumber = numCheck.checked;
  const hasSymbol = symCheck.checked;

  const basePercentage = passwordLength / 64 * 0.25;
  const baseBonus = (hasUpper ? 15 : 0) + (hasNumber ? 25 : 0) + (hasSymbol ? 35 : 0);
  
  const percentage = Math.round(basePercentage + baseBonus);

  checkSec.style.width = `${percentage}%`;

  checkSec.classList.remove("critical", "warning", "success");
  let classToAdd;
  if (percentage >= 69) {
    classToAdd = "success";
  } else if (percentage >= 50) {
    classToAdd = "warning";
  } else {
    classToAdd = "critical";
  }
  checkSec.classList.add(classToAdd);
};

const calculateFontSize = () => {
  const fontClasses = ["font-xs", "font-sm", "font-md"];

  fontClasses.forEach(className => input.classList.remove(className));

  if (passwordLength >= 45) {
    input.classList.add("font-xs");
  } else if (passwordLength >= 32) {
    input.classList.add("font-md");
  } else if (passwordLength >= 22) {
    input.classList.add("font-sm");
  }
};


const genRangePassword = () => {
  passwordLength = range.value;
  lenPassword.innerText = passwordLength;
  generationPassword();
};

const copy = () => {
  navigator.clipboard.writeText(input.value);
  alert("Senha copiada com sucesso!");
};

range.addEventListener("input", genRangePassword);
btn.addEventListener("click", generationPassword);

btnCopy.addEventListener("click", copy);
btnGen.addEventListener("click", genRangePassword);
copyPassword.addEventListener("click", copy);

numCheck.addEventListener("click", generationPassword);
upCheck.addEventListener("click", generationPassword);
symCheck.addEventListener("click", generationPassword);

window.onload = generationPassword;
