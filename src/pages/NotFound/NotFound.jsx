import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <AlertTriangle className="text-red-500 w-16 h-16 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-lg text-gray-700 mb-6">Ops! Página não encontrada.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
