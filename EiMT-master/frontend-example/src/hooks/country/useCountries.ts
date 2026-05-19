import { useCallback, useEffect, useState } from 'react';
import countryApi from '../../api/countryApi';
import type { Country, CreateCountryDto, EditCountryDto } from '../../types/country';

const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        try {
            const response = await countryApi.findAll();
            setCountries(response.data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error has occured while loading countries!'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            void refetch();
        }, 0);

        return () => {
            window.clearTimeout(timer);
        };
    }, [refetch]);

    const createCountry = async (data: CreateCountryDto) => {
        await countryApi.create(data);
        await refetch();
    };

    const editCountry = async (id: string, data: EditCountryDto) => {
        await countryApi.edit(id, data);
        await refetch();
    };

    const deleteCountry = async (id: string) => {
        await countryApi.delete(id);
        await refetch();
    };

    return { countries, loading, error, refetch, createCountry, editCountry, deleteCountry };
}

export default useCountries;
