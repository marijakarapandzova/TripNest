import {useAxios} from '../hooks/useAxios';
import type { Country, CreateCountryDto, EditCountryDto } from '../types/country';

const countryApi = {
    findAll: async () => {
        return await useAxios.get<Country[]>('/countries');
    },
    findById: async (id: string) => {
        return await useAxios.get<Country>(`/countries/${id}`);
    },
    create: async (data: CreateCountryDto) => {
        return await useAxios.post<Country>('/countries/add', data);
    },
    edit: async (id: string, data: EditCountryDto) => {
        return await useAxios.put<Country>(`/countries/edit/${id}`, data);
    },
    delete: async (id: string) => {
        return await useAxios.delete(`/countries/delete/${id}`);
    },
}

export default countryApi;