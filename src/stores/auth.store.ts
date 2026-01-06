import { defineStore } from 'pinia';
import { apiLogin, apiRegister } from '@/services/auth.api';
import { useCvStore } from '@/stores/cv.store.ts';
import { apiGetMyImage } from '@/services/user-image.service.ts'

type User = { id?: string; email?: string; name?: string; profilePicture?: string };
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

        // tolérant aux formats {data:{token,user}} ou {token,user}
        const payload = res?.data ?? res;
        const token = payload?.token ?? payload?.data?.token;
        const user = payload?.user ?? payload?.data?.user ?? {
          id: payload?.id ?? payload?.data?.id,
          email: payload?.email ?? payload?.data?.email,
          name: payload?.name ?? payload?.data?.name,
        };

        this.user = user;
        this.token = token;
        if (token) localStorage.setItem('auth_token', token);

        const meImg = await apiGetMyImage()
        const url = meImg?.data?.profilePicture || ''
        this.user = { ...this.user, profilePicture: url }

        // sync aussi dans cvStore
        const cvStore = useCvStore()
        cvStore.setUserProfilePicture(url)
      } catch (e: any) {
        this.error = e?.response?.data?.error?.message || 'Login failed';
        throw e;
      } finally { this.loading = false; }
    },
    async register(name: string, email: string, password: string) {
      this.loading = true; this.error = null;
      try {
        const res = await apiRegister({ name, email, password });

        // ton format actuel: { success:true, data:{ id,email,name,token } }
        const payload = res?.data ?? res;
        const token = payload?.token ?? payload?.data?.token;
        const user = payload?.user ?? payload?.data?.user ?? {
          id: payload?.id ?? payload?.data?.id,
          email: payload?.email ?? payload?.data?.email,
          name: payload?.name ?? payload?.data?.name,
        };

        // on est déjà authentifié grâce au token de register
        this.user = user;
        this.token = token;
        if (token) localStorage.setItem('auth_token', token);

        // créer un CV vide juste après
        const cvStore = useCvStore();
        await cvStore.createEmptyCv("Default CV");
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
