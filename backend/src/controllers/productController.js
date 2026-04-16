const productService = require('../services/productService');

class ProductController {
  async criar(req, res, next) {
    try {
      const produto = await productService.criarProduto(req.body);
      return res.status(201).json(produto);
    } catch (error) {
      next(error);
    }
  }

  async listar(req, res, next) {
    try {
      const produtos = await productService.listarProdutos();
      return res.status(200).json(produtos);
    } catch (error) {
      next(error);
    }
  }

  async buscarPorId(req, res, next) {
    try {
      const produto = await productService.buscarProdutoPorId(req.params.id);
      return res.status(200).json(produto);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req, res, next) {
    try {
      const produto = await productService.atualizarProduto(req.params.id, req.body);
      return res.status(200).json(produto);
    } catch (error) {
      next(error);
    }
  }

  async deletar(req, res, next) {
    try {
      await productService.deletarProduto(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
