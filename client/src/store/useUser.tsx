import create from "zustand";

interface UserActions {
    login: (email: string, password: string) => void;
}

type User = {
    name: string;
    email: string;
}

const initialStates = {
    user: null as User | null,
    isAuthenticated: false,
};

const useUser = create<typeof initialStates & UserActions>()((set, get) => ({
    ...initialStates,
    login: () => {
        // TODO: handle login here

        const user = {
            name: 'Aykut Saraç',
            email: '200541034@firat.edu.tr',
        };

        set({ user, isAuthenticated: true });
    },
    logout: () => set({ user: null, isAuthenticated: false })
}))

export default useUser;