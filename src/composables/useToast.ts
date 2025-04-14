import { ref } from "vue";

export function useToast() {
    const show = ref(false);
    const toggleShow = () => {
        show.value = !show.value;
    }
    return { show, toggleShow };
}