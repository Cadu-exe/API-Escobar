const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  codigoInterno: String,
  nome: String,
  descricao: String,
  valor: Number
});

module.exports = mongoose.model('Produto', produtoSchema);
