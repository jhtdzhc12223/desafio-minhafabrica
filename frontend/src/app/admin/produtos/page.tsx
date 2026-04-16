'use client';

import { useEffect, useState } from 'react';
import api from '../../../services/api';
import { Product } from '../../../types';

const initialForm: Product = {
  nome: '',
  descricao: '',
  preco: 0,
  estoque: 0,
  categoria: '',
};

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Product>(initialForm);
  const [erro, setErro] = useState('');

  const fetchProdutos = async () => {
    try {
      const response = await api.get('/products');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setForm(initialForm);
    setErro('');
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setForm({
      nome: product.nome,
      descricao: product.descricao,
      preco: product.preco,
      estoque: product.estoque,
      categoria: product.categoria,
    });
    setErro('');
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      setErro('');

      if (!form.nome || !form.categoria) {
        setErro('Nome e categoria são obrigatórios.');
        return;
      }

      if (form.preco < 0 || form.estoque < 0) {
        setErro('Preço e estoque não podem ser negativos.');
        return;
      }

      if (editingProduct?._id) {
        await api.put(`/products/${editingProduct._id}`, form);
      } else {
        await api.post('/products', form);
      }

      setModalOpen(false);
      setForm(initialForm);
      fetchProdutos();
    } catch (error: any) {
      setErro(error?.response?.data?.message || 'Erro ao salvar produto.');
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;

    const confirmDelete = window.confirm('Deseja realmente excluir este produto?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Novo Produto
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {loading ? (
          <p className="p-6">Carregando...</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Categoria</th>
                <th className="text-left p-4">Preço</th>
                <th className="text-left p-4">Estoque</th>
                <th className="text-left p-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="p-4">{product.nome}</td>
                  <td className="p-4">{product.categoria}</td>
                  <td className="p-4">R$ {Number(product.preco).toFixed(2)}</td>
                  <td className="p-4">{product.estoque}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}

              {produtos.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingProduct ? 'Editar Produto' : 'Novo Produto'}
            </h2>

            {erro && <p className="text-red-500 text-sm mb-3">{erro}</p>}

            <input
              type="text"
              placeholder="Nome"
              className="w-full border rounded p-2 mb-3"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />

            <input
              type="text"
              placeholder="Descrição"
              className="w-full border rounded p-2 mb-3"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            />

            <input
              type="number"
              placeholder="Preço"
              className="w-full border rounded p-2 mb-3"
              value={form.preco}
              onChange={(e) =>
                setForm({ ...form, preco: Number(e.target.value) })
              }
            />

            <input
              type="number"
              placeholder="Estoque"
              className="w-full border rounded p-2 mb-3"
              value={form.estoque}
              onChange={(e) =>
                setForm({ ...form, estoque: Number(e.target.value) })
              }
            />

            <input
              type="text"
              placeholder="Categoria"
              className="w-full border rounded p-2 mb-4"
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}