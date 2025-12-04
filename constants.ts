import { UserRole } from './types';

export const APP_NAME = "PapiFast";

export const API_BASE_URL = "https://api.papifast.com/v1"; // Mock URL

export const DEFAULT_CURRENCY_LOCALE = 'pt-BR';
export const DEFAULT_CURRENCY = 'BRL';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  subItems?: NavItem[];
}

export const NAV_ITEMS: Record<string, NavItem[]> = {
  [UserRole.ADMIN]: [
    { label: 'Home', path: '/admin/dashboard', icon: 'fa-home' },
    { label: 'Campanhas', path: '/admin/campanhas', icon: 'fa-chart-line' },
    { label: 'Convites', path: '/admin/convites', icon: 'fa-envelope' },
    { label: 'Cupons', path: '/admin/cupons', icon: 'fa-ticket' },
    { label: 'Voucher', path: '/admin/voucher', icon: 'fa-clock' },
    { 
      label: 'Eventos', 
      path: '/admin/eventos', 
      icon: 'fa-calendar',
      subItems: [
        { label: 'Meus Eventos', path: '/admin/eventos/meus', icon: 'fa-calendar-day' },
        { label: 'Todos os Eventos', path: '/admin/eventos', icon: 'fa-list' }
      ]
    },
    { label: 'Vender', path: '/admin/vender', icon: 'fa-cash-register' },
    { label: 'Filiais', path: '/admin/filiais', icon: 'fa-store' },
    { 
      label: 'Recibos', 
      path: '/admin/recibos', 
      icon: 'fa-file-invoice',
      subItems: [
        { label: 'Ingressos', path: '/admin/recibos/ingressos', icon: 'fa-ticket-alt' }
      ]
    },
    { 
      label: 'Usuários', 
      path: '/admin/usuarios', 
      icon: 'fa-users',
      subItems: [
        { label: 'Clientes', path: '/admin/usuarios/clientes', icon: 'fa-user-group' },
        { label: 'Funcionários', path: '/admin/usuarios/funcionarios', icon: 'fa-id-card' }
      ]
    },
    { label: 'Sincronizar/UAIPDV', path: '/admin/sincronizar', icon: 'fa-sync' },
    { label: 'Suporte', path: '/admin/suporte', icon: 'fa-headset' },
  ],
  [UserRole.CLIENTE]: [
    { label: 'Home', path: '/app/home', icon: 'fa-home' },
    { label: 'Convites', path: '/app/convites', icon: 'fa-envelope' },
    { 
      label: 'Eventos', 
      path: '/app/eventos', 
      icon: 'fa-calendar',
      subItems: [
        { label: 'Meus Eventos', path: '/app/eventos/meus', icon: 'fa-calendar-check' },
        { label: 'Todos os Eventos', path: '/app/eventos/todos', icon: 'fa-list' }
      ]
    },
    { label: 'Vender', path: '/app/vender', icon: 'fa-ticket' },
    { 
      label: 'Cupons', 
      path: '/app/cupons', 
      icon: 'fa-tags',
      subItems: [
        { label: 'Disponíveis', path: '/app/cupons/disponiveis', icon: 'fa-cart-plus' },
        { label: 'Meus Cupons', path: '/app/cupons/meus', icon: 'fa-tag' }
      ]
    },
    { 
      label: 'Recibos', 
      path: '/app/recibos', 
      icon: 'fa-file-invoice',
      subItems: [
        { label: 'De Presente', path: '/app/recibos/presente', icon: 'fa-gift' },
        { label: 'De Ingressos', path: '/app/recibos/ingressos', icon: 'fa-ticket-alt' }
      ]
    },
    { label: 'Voucher', path: '/app/voucher', icon: 'fa-clock' },
    { label: 'Suporte', path: '/app/suporte', icon: 'fa-headset' },
  ]
};