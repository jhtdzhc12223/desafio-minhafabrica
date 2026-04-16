'use client';

import { useEffect, useState } from 'react';
import api from '../../../services/api';
import { DashboardData } from '../../../types';

export default function DashboardPage() {
  const [dados, setDados] = useState<DashboardData>({
    totalUsuarios: 0,
    totalProdutos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/dashboard');
        setDados(response.data);
      } catch (error) {
        console.error('Erro ao buscar dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg text-gray-500 mb-2">Total de Usuários</h2>
            <p className="text-4xl font-bold">{dados.totalUsuarios}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg text-gray-500 mb-2">Total de Produtos</h2>
            <p className="text-4xl font-bold">{dados.totalProdutos}</p>
          </div>
        </div>
      )}
    </div>
  );
}