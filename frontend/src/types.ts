export interface Workplace {
    id: number;
    name: string;
    description: string;
    ip_address: string | null;
}

export type WorkplaceFormData = Omit<Workplace, 'id'> & {
    has_pc: boolean;
};