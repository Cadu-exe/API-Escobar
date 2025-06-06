const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  cpf: String,
  nome: String,
  endereco: {
    rua: String,
    numero: Number,
    bairro: String,
    cidade: String,
    estado: String,
    cep: String
  },
  telefone: String,
  email: String
});

module.exports = mongoose.model('Cliente', clienteSchema);
