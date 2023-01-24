// Object é uma coleção de chave e valor
const produto = {
  nome: 'Caneta',
  preco: 1.9,
  categoria: {
    nome: 'Papelaria',
    id: 1,
  },
};

const pessoa = {
  nome: 'w2k',
  idade: 32,
  endereco: {
    logradouro: 'Rua',
    rua: 'Rua 1',
    bairro: 'Bairro 1',
    numero: 1000,
  },
};

console.log(produto, pessoa);
