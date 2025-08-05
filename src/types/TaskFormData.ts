export interface TaskFormData {
    title: string;
    description: string;
    deadline: string;
    reporterId: string;
    approverId: string;
    approveStatus: 'approved' | 'need-approval';
    dashboardId: string;
    blockedBy: string[];
}