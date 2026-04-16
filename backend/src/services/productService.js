const productRepository = require('../repositories/productRepository');

class ProductService {
  async criarProduto(dados) {
    const { nome, preco, estoque, categoria } = dados;

    if (!nome || preco === undefined || estoque === undefined || !categoria) {
      const error = new Error('Nome, preço, estoque e categoria são obrigatórios');
      error.statusCode = 400;
      throw error;
    }

    if (preco < 0) {
      const error = new Error('Preço não pode ser negativo');
      error.statusCode = 400;
      throw error;
    }

    if (estoque < 0) {
      const error = new Error('Estoque não pode ser negativo');
      error.statusCode = 400;
      throw error;
    }

    return await productRepository.create(dados);
  }

  async listarProdutos() {
    return await productRepository.findAll();
  }

  async buscarProdutoPorId(id) {
    const produto = await productRepository.findById(id);

    if (!produto) {
      const error = new Error('Produto não encontrado');
      error.statusCode = 404;
      throw error;
    }

    return produto;
  }

  async atualizarProduto(id, dados) {
    if (dados.preco !== undefined && dados.preco < 0) {
      const error = new Error('Preço não pode ser negativo');
      error.statusCode = 400;
      throw error;
    }

    if (dados.estoque !== undefined && dados.estoque < 0) {
      const error = new Error('Estoque não pode ser negativo');
      error.statusCode = 400;
      throw error;
    }

    const produtoAtualizado = await productRepository.update(id, dados);

    if (!produtoAtualizado) {
      const error = new Error('Produto não encontrado');
      error.statusCode = 404;
      throw error;
    }

    return produtoAtualizado;
  }

  async deletarProduto(id) {
    const deletado = await productRepository.delete(id);

    if (!deletado) {
      const error = new Error('Produto não encontrado');
      error.statusCode = 404;
      throw error;
    }

    return deletado;
  }

  async contarProdutos() {
    return await productRepository.count();
  }
}

module.exports = new ProductService();