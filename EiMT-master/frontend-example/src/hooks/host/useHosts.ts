import { useCallback, useEffect, useState } from 'react';
import hostApi from '../../api/hostApi';
import type { Host, CreateHostDto, EditHostDto } from '../../types/host';

const normalizeHost = (h: Host & { countryId?: number }): Host => {
    const country_id = h.country_id ?? h.countryId ?? 0;
    return { ...h, country_id };
};

const useHosts = () => {
    const [hosts, setHosts] = useState<Host[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        try {
            const response = await hostApi.findAll();
            setHosts(response.data.map((h) => normalizeHost(h as Host & { countryId?: number })));
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error has occured while loading hosts!'));
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

    const createHost = async (data: CreateHostDto) => {
        await hostApi.create(data);
        await refetch();
    };

    const editHost = async (id: string, data: EditHostDto) => {
        await hostApi.edit(id, data);
        await refetch();
    };

    const deleteHost = async (id: string) => {
        await hostApi.delete(id);
        await refetch();
    };

    return { hosts, loading, error, refetch, createHost, editHost, deleteHost };
}

export default useHosts;
