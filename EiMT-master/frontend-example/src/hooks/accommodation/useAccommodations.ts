import { useCallback, useEffect, useState } from 'react';
import accommodationApi from '../../api/accommodationApi';
import type { Accommodation, CreateAccommodationDto, EditAccommodationDto } from '../../types/accommodation';

const useAccommodations = () => {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        try {
            const response = await accommodationApi.findAll();
            setAccommodations(response.data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error has occured while loading accommodations!'));
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

    const createAccommodation = async (data: CreateAccommodationDto) => {
        await accommodationApi.create(data);
        await refetch();
    };

    const editAccommodation = async (id: string, data: EditAccommodationDto) => {
        await accommodationApi.edit(id, data);
        await refetch();
    };

    const deleteAccommodation = async (id: string) => {
        await accommodationApi.delete(id);
        await refetch();
    };

    return { accommodations, loading, error, refetch, createAccommodation, editAccommodation, deleteAccommodation };
}

export default useAccommodations;
