import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { UserRole } from '../../../types';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    login(role);
    if (role === UserRole.ADMIN) {
      navigate('/admin/dashboard');
    } else {
      navigate('/app/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            PapiFast
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Escolha um perfil para simular o acesso
          </p>
        </div>
        <div className="space-y-4 mt-8">
          <button
            onClick={() => handleLogin(UserRole.ADMIN)}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-deepOrange hover:bg-brand-darkYellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-colors"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <i className="fa-solid fa-lock text-orange-200 group-hover:text-white transition-colors"></i>
            </span>
            Entrar como Administrador
          </button>

          <button
            onClick={() => handleLogin(UserRole.CLIENTE)}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <i className="fa-solid fa-user text-green-200 group-hover:text-white transition-colors"></i>
            </span>
            Entrar como Cliente
          </button>
        </div>
      </div>
    </div>
  );
};