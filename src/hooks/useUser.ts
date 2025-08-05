// tasker/src/hooks/useUser.ts
import { useQuery } from "@tanstack/react-query";
import API from "@/lib/axios";

interface User {
  id: number;
  name: string;
  surname: string;
  middlename: string;
  login: string;
  roleID: number;
}

export function useUser() {
  const {
    data: user,
    isLoading: loading,
    isError,
    error,
  } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await API.get<User>("/api/getuserbyJWT");
      return response.data;
    },
  });

  return {
    user: user ?? null,
    loading,
    error: isError ? error.message : null,
  };
}
