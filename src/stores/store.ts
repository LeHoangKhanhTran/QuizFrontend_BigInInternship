import { reactive } from "vue";
import type { User } from "../types";

export const store = reactive<{
    theme: string;
    toggleTheme: () => void;
    user: User | null;
    userLoading: boolean;
    setUser: (user: User | null) => void;
}>({
    theme: "dark", 
    toggleTheme() {
        this.theme = this.theme === "dark" ? "light" : "dark";
    },
    user: null,
    userLoading: false,
    setUser(user: User | null) {
        this.user = user;
    },
});