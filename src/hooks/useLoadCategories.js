import { useQuery } from '@tanstack/react-query';

const useLoadCategories = () => {
    const { data } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
          const res = await fetch("https://buy-cycle-server.vercel.app/categories");
          const data = await res.json();
          return data;
        },
    });
    return data;
};

export default useLoadCategories;