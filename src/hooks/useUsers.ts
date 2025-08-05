import { useQuery } from "@tanstack/react-query";
import API from "@/lib/axios";

export interface User {
  id: string;
  login: string;
  name: string;
}

export const useUsers = () => {
  const {
    data: users = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await API.get<User[]>("/Users");
      return response.data;
    },
  });

  return {
    users,
    loading,
    error: isError ? error.message : null,
  };
};