import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { authActions } from "src/service/auth";
import create from "zustand";

interface UserActions {
  login: (email: string, password: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

type User = {
  name: string;
  email: string;
  admin: boolean;
};

const initialStates = {
  user: null as User | null,
  isAuthenticated: false,
};

const useUser = create<typeof initialStates & UserActions>()((set, get) => ({
  ...initialStates,
  checkAuth: () => {
    const user = localStorage.getItem('user');
    if (user) {
    set({ user: JSON.parse(user) , isAuthenticated: true });
    }
  },
  login: async (email, password) => {
    try {
      toast.loading('Giriş yapılıyor...', { id: 'login' });
      const res: AxiosResponse<{ data: User }> = await authActions.login({ email, password });
  
      toast.success(`Hoşgeldin, ${res.data.data.name}!`, { id: 'login' });
      localStorage.setItem('user', JSON.stringify(res.data.data));
      set({ user: res.data.data , isAuthenticated: true });
    } catch (error: any) {
      if (error.response.status === 403) {
        return window.location.replace(`/verify?email=${error.response.data.data}`);
      }
      toast.error('Giriş bilgileri doğru değildir!', { id: 'login' });
    }
   
  },
  logout: () => {
    toast.success(`Görüşmek üzere ${get().user?.name}!`);
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },
}));

export default useUser;
