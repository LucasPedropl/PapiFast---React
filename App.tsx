import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Shell } from './components/layout/Shell';
import { Dashboard } from './apps/admin/pages/dashboard/Dashboard';
import * as AdminPages from './apps/admin/pages/AdminPages';
import * as ClientPages from './apps/client/pages/ClientPages';
import { MenuMobilePage } from './components/layout/MenuMobilePage';
import { Login } from './apps/publico/pages/Login';
import { UserRole } from './types';

// Guard Component
const RequireAuth: React.FC<{ children: React.ReactElement, allowedRoles?: UserRole[] }> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect based on role if trying to access unauthorized area
    return <Navigate to={user.role === UserRole.ADMIN ? '/admin/dashboard' : '/app/home'} replace />;
  }

  return <Shell>{children}</Shell>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Admin Routes */}
      <Route 
        path="/admin/*" 
        element={
          <RequireAuth allowedRoles={[UserRole.ADMIN, UserRole.GERENTE]}>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              
              <Route path="campanhas" element={<AdminPages.Campanhas />} />
              <Route path="convites" element={<AdminPages.Convites />} />
              <Route path="cupons" element={<AdminPages.Cupons />} />
              <Route path="voucher" element={<AdminPages.Voucher />} />
              
              <Route path="eventos" element={<AdminPages.EventosLista />} />
              <Route path="eventos/meus" element={<AdminPages.EventosMeus />} />
              <Route path="eventos/novo" element={<AdminPages.EventosNovo />} />
              
              <Route path="vender" element={<AdminPages.Vender />} />
              <Route path="filiais" element={<AdminPages.Filiais />} />
              
              <Route path="recibos/ingressos" element={<AdminPages.RecibosIngressos />} />
              
              <Route path="usuarios/clientes" element={<AdminPages.UsuariosClientes />} />
              <Route path="usuarios/funcionarios" element={<AdminPages.UsuariosFuncionarios />} />
              
              <Route path="sincronizar" element={<AdminPages.Sincronizar />} />
              <Route path="suporte" element={<AdminPages.Suporte />} />
              
              <Route path="menu" element={<MenuMobilePage />} />

              <Route path="*" element={<Navigate to="dashboard" />} />
            </Routes>
          </RequireAuth>
        } 
      />

      {/* Client App Routes */}
      <Route 
        path="/app/*" 
        element={
          <RequireAuth allowedRoles={[UserRole.CLIENTE, UserRole.ADMIN]}>
            <Routes>
              <Route path="home" element={<ClientPages.Home />} />
              <Route path="convites" element={<ClientPages.Convites />} />
              
              <Route path="eventos/meus" element={<ClientPages.MeusEventos />} />
              <Route path="eventos/todos" element={<ClientPages.TodosEventos />} />
              
              <Route path="vender" element={<ClientPages.Vender />} />
              
              <Route path="cupons/disponiveis" element={<ClientPages.CuponsDisponiveis />} />
              <Route path="cupons/meus" element={<ClientPages.MeusCupons />} />
              
              <Route path="recibos/presente" element={<ClientPages.RecibosPresente />} />
              <Route path="recibos/ingressos" element={<ClientPages.RecibosIngressos />} />
              
              <Route path="voucher" element={<ClientPages.Voucher />} />
              <Route path="suporte" element={<ClientPages.Suporte />} />
              
              <Route path="menu" element={<MenuMobilePage />} />

              <Route path="*" element={<Navigate to="home" />} />
            </Routes>
          </RequireAuth>
        } 
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;