const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Nome do produto é obrigatório'],
      trim: true
    },
    descricao: {
      type: String,
      default: ''
    },
    preco: {
      type: Number,
      required: [true, 'Preço é obrigatório'],
      min: [0, 'Preço não pode ser negativo']
    },
    estoque: {
      type: Number,
      required: [true, 'Estoque é obrigatório'],
      min: [0, 'Estoque não pode ser negativo']
    },
    categoria: {
      type: String,
      required: [true, 'Categoria é obrigatória'],
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);