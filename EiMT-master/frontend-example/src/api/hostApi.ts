import {useAxios} from '../hooks/useAxios';
import type { Host, CreateHostDto, EditHostDto } from '../types/host';

const hostApi = {
    findAll: async () => {
        return await useAxios.get<Host[]>('/hosts');
    },
    findById: async (id: string) => {
        return await useAxios.get<Host>(`/hosts/${id}`);
    },
    create: async (data: CreateHostDto) => {
        return await useAxios.post<Host>('/hosts/add', data);
    },
    edit: async (id: string, data: EditHostDto) => {
        return await useAxios.put<Host>(`/hosts/edit/${id}`, data);
    },
    delete: async (id: string) => {
        return await useAxios.delete(`/hosts/delete/${id}`);
    },
}

export default hostApi;