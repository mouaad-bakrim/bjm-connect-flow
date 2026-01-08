import { User, api, TokenResponse } from './api';

const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const USER_KEY = 'user';

export const auth = {
  setTokens: (tokens: TokenResponse) => {
    localStorage.setItem(TOKEN_KEY, tokens.access);
    localStorage.setItem(REFRESH_KEY, tokens.refresh);
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),

  setUser: (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  },

  login: async (email: string, password: string): Promise<User> => {
    const tokens = await api.login(email, password);
    auth.setTokens(tokens);
    const user = await api.getMe();
    auth.setUser(user);
    return user;
  },

  getRedirectPath: (user: User): string => {
    if (user.role === 'ADMIN') return '/dashboard/admin';
    if (user.role === 'WHOLESALER') {
      return user.status === 'APPROVED' ? '/dashboard/wholesaler' : '/pending';
    }
    return '/dashboard/buyer';
  },
};
