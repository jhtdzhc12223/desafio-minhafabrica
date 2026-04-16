export interface User {
  _id?: string;
  nome: string;
  email: string;
  senha?: string;
  perfil: 'admin' | 'user';
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  _id?: string;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DashboardData {
  totalUsuarios: number;
  totalProdutos: number;
}