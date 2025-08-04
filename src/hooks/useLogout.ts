import API from "@/lib/axios";

export default function useLogout() {
    const response = await API.get('/logout');
};