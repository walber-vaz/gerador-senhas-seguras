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
  let chars = "abcdefghijklmnopqrstuvwxyz";
  const upcaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbersChars = "0123456789";
  const symbolsChars = "!@#$%&*()_+[]{};:.,?/|";

  if (upCheck.checked) {
    chars += upcaseChars;
  }
  if (numCheck.checked) {
    chars += numbersChars;
  }
  if (symCheck.checked) {
    chars += symbolsChars;
  }

  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const random = Math.floor(Math.random() * chars.length);
    password += chars.charAt(random + 1);
  }
  input.value = password;
  calculateQuantity();
  calculateFontSize();
};

const calculateQuantity = () => {
  const percentage = Math.round(
    (passwordLength / 64) * 100 * 0.25 +
      (upCheck.checked ? 15 : 0) +
      (numCheck.checked ? 25 : 0) +
      (symCheck.checked ? 35 : 0)
  );
  checkSec.style.width = `${percentage}%`;
  checkSec.classList.remove("critical", "warning", "success");
  checkSec.classList.add(
    percentage >= 69 ? "success" : percentage >= 50 ? "warning" : "critical"
  );
};

const calculateFontSize = () => {
  if (passwordLength >= 45) {
    input.classList.remove("font-sm");
    input.classList.remove("font-md");
    input.classList.add("font-xs");
  } else if (passwordLength >= 32) {
    input.classList.remove("font-sm");
    input.classList.add("font-md");
    input.classList.remove("font-xs");
  } else if (passwordLength >= 22) {
    input.classList.add("font-sm");
    input.classList.remove("font-md");
    input.classList.remove("font-xs");
  } else {
    input.classList.remove("font-sm");
    input.classList.remove("font-md");
    input.classList.remove("font-xs");
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

window.onload = generationPassword();
