import { queryClient } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { theme } from "../utils/theme";


export const useCustomTheme = () => {
    const newTheme = useQuery(['theme'], () => "dark", {
        enabled: false,
    }).data as any

    const customTheme = theme(newTheme)

    const toggleTheme = (newTheme: string) => {
        queryClient.setQueryData(['theme'], newTheme)
    }

    return { customTheme, toggleTheme }
}