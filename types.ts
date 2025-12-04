export enum UserRole {
  ADMIN = 'ADMIN',
  GERENTE = 'GERENTE',
  FUNCIONARIO = 'FUNCIONARIO',
  CLIENTE = 'CLIENTE',
  GUEST = 'GUEST'
}

export interface Filial {
  id: number;
  nome: string;
  cnpj: string;
  endereco: string;
}

export interface User {
  id: number;
  nome: string;
  email: string;
  role: UserRole;
  filialId?: number; // For non-clients
}

export interface Evento {
  id: number;
  slug: string;
  nome: string;
  dataInicio: string;
  local: string;
  status: 'Ativo' | 'Rascunho' | 'Finalizado';
  vendasTotais: number;
}

export interface Campanha {
  id: number;
  titulo: string;
  ativo: boolean;
  dataFim: string;
}

export interface Cupom {
  id: number;
  codigo: string;
  desconto: number;
  utilizado: boolean;
}
