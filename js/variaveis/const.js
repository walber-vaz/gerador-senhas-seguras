// Const e uma variável que nao pode ser alterada
const nome = 'Walber';

{
  console.log(nome);
  // não pode ser alterada
  nome = 'w2k';
  // não pode ser lida fora do escopo
  const sobrenome = 'Vaz';
}

console.log(nome);
console.log(sobrenome);
