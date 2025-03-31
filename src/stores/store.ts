import { reactive } from "vue";

export const store = reactive({
    theme: "dark", 
    toggleTheme() {
        this.theme = this.theme === "dark" ? "light" : "dark";
    }
});