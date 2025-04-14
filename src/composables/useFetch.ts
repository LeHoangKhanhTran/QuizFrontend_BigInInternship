import { onMounted, ref } from "vue"
import { api } from "../axios"
import type { AxiosError } from "axios"

export default function useFetch<T>(url: string) {
    const data = ref<T | null>(null)
    const error = ref(null)
    const loading = ref(true)
    onMounted(async () => {
        const fetchData = async () => {
          try {
            const response = await api.get(url);
            if (response.status === 200) {
              data.value = response.data as T;
            }
          } catch (err) {
            const axiosError = err as AxiosError;
            console.error(axiosError);
          } finally {
            loading.value = false;
          }
        };
        await fetchData();
    })
    return { data, error, loading }
}