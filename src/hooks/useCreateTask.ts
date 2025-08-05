import { useMutation, UseMutationResult } from "@tanstack/react-query";
import API from "@/lib/axios";

export interface CreateTaskPayload {
    title: string;
    description: string;
    deadline: string;
    dashboardID: string;
    reporterID: string;
    approveStatus: 'approved' | 'need-approval';
    approverID: string;
    blockers: string[];
}

const createTaskAPI = async (payload: CreateTaskPayload): Promise<any> => {
    const response = await API.post("/create", payload);
    if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to create task with status: " + response.status);
    }
    return response.data;
};

export const useCreateTask = () => {
    const mutation = useMutation<any, Error, CreateTaskPayload>({
        mutationFn: createTaskAPI,
    });

    return {
        createTask: mutation.mutateAsync,
        loading: mutation.status === "pending",
        success: mutation.status === "success",
        error: mutation.error ? mutation.error.message : null,
    };
};
