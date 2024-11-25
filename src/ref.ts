const gigi = { nome: "Gigi", eta: 56 };
const piero = { ...gigi }; // copia

const numeri = [1, 2, 3];
const quadrati = [...numeri]; // copia

piero.nome = "Piero"; // { nome: "Piero", eta: 56 }

console.log(gigi);
console.log(piero);

const nuovaArray = [...numeri, 8, 6]