'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-8">Admin</h2>

        <nav className="flex flex-col gap-3">
          <Link
            href="/admin/dashboard"
            className={`px-4 py-2 rounded-lg ${
              pathname === '/admin/dashboard'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/admin/usuarios"
            className={`px-4 py-2 rounded-lg ${
              pathname === '/admin/usuarios'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Usuários
          </Link>

          <Link
            href="/admin/produtos"
            className={`px-4 py-2 rounded-lg ${
              pathname === '/admin/produtos'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Produtos
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Sair
        </button>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}