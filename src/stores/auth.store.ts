import { defineStore } from 'pinia';
import { apiLogin, apiRegister } from '@/services/auth.api';

type User = { id?: string; email?: string; name?: string };
type State = { token: string | null; user: User | null; loading: boolean; error: string | null };

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    token: localStorage.getItem('auth_token'),
    user: null,
    loading: false,
    error: null,
  }),
  actions: {
    async login(email: string, password: string) {
      this.loading = true; this.error = null;
      try {
        const res = await apiLogin({ email, password });
        const { token, user } = res.data ;
        this.user = user;
        this.token = token;
        localStorage.setItem('auth_token', token);
      } catch (e: any) {
        this.error = e?.response?.data?.error?.message || 'Login failed';
        throw e;
      } finally { this.loading = false; }
    },
    async register(name: string, email: string, password: string) {
      this.loading = true; this.error = null;
      try {
        await apiRegister({ name, email, password });
        // auto-login après register
        await this.login(email, password);
      } catch (e: any) {
        this.error = e?.response?.data?.error?.message || 'Register failed';
        throw e;
      } finally { this.loading = false; }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('auth_token');
    },
  },
});
