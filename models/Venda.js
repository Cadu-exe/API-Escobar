const mongoose = require('mongoose');

const vendaSchema = new mongoose.Schema({
  data: String,
  numeroNota: String,
  cliente: {
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
  },
  produtos: [
    {
      codigoInterno: String,
      nome: String,
      quantidade: Number,
      valorUnitario: Number
    }
  ],
  totalVenda: Number
});

module.exports = mongoose.model('Venda', vendaSchema);
