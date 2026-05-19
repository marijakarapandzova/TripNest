import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Alert, Button, CircularProgress, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import useHosts from '../../../hooks/host/useHosts';
import useCountries from '../../../hooks/country/useCountries';
import type { CreateHostDto, EditHostDto, Host } from '../../../types/host';
import HostFormDialog from '../../components/host/HostFormDialog';
import HostGrid from '../../components/host/HostGrid';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import Section from '../../components/layout/Section/Section';
import Surface from '../../components/layout/Surface/Surface';

const HostsPage = () => {
    const { isAdmin } = useAuth();
    const { hosts, loading, error, createHost, editHost, deleteHost } = useHosts();
    const { countries, loading: countriesLoading, error: countriesError } = useCountries();

    const [addOpen, setAddOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Host | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Host | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const countryNameById = useMemo(() => {
        const m: Record<number, string> = {};
        for (const c of countries) m[c.id] = c.name;
        return m;
    }, [countries]);

    const handleCreate = async (data: CreateHostDto | EditHostDto) => {
        await createHost(data as CreateHostDto);
    };

    const handleEdit = async (data: CreateHostDto | EditHostDto) => {
        if (!editTarget) return;
        await editHost(String(editTarget.id), data as EditHostDto);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleteLoading(true);
        setDeleteError(null);
        try {
            await deleteHost(String(deleteTarget.id));
            setDeleteTarget(null);
        } catch (err) {
            setDeleteError(err instanceof Error ? err.message : 'Delete failed. The host may have related accommodations.');
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <Section>
            <PageHeader
                id='hosts-heading'
                title='Host directory'
                subtitle='Meet the people behind the listings. Open a profile to see where they are based and link through to their country.'
                meta={
                    !loading && !error && hosts.length > 0 ? (
                        <Typography variant='body2' sx={{ color: 'primary.main', fontWeight: 600 }}>
                            {hosts.length} host{hosts.length === 1 ? '' : 's'} in the directory
                        </Typography>
                    ) : null
                }
                actions={
                    isAdmin ? (
                        <Button
                            variant='contained'
                            startIcon={<AddRoundedIcon />}
                            onClick={() => setAddOpen(true)}
                            sx={{ borderRadius: 2 }}
                        >
                            Add host
                        </Button>
                    ) : null
                }
            />

            {error && <Alert severity='error' role='alert'>{error.message}</Alert>}
            {countriesError && (
                <Alert severity='warning' role='status'>
                    {countriesError.message} Country names on cards may be incomplete.
                </Alert>
            )}

            {loading && (
                <Surface sx={{ display: 'grid', placeItems: 'center', minHeight: 280 }}>
                    <CircularProgress aria-label='Loading hosts' />
                </Surface>
            )}

            {!loading && !error && hosts.length === 0 && (
                <Alert severity='info'>No hosts are listed yet. Check back soon.</Alert>
            )}

            {!loading && !error && hosts.length > 0 && (
                <HostGrid
                    hosts={hosts}
                    countryNameById={countriesLoading ? undefined : countryNameById}
                    onEdit={isAdmin ? setEditTarget : undefined}
                    onDelete={isAdmin ? setDeleteTarget : undefined}
                />
            )}

            <HostFormDialog
                open={addOpen}
                onClose={() => setAddOpen(false)}
                onSubmit={handleCreate}
                countries={countries}
                title='Add host'
            />

            <HostFormDialog
                open={!!editTarget}
                onClose={() => setEditTarget(null)}
                onSubmit={handleEdit}
                initialValues={editTarget ?? undefined}
                countries={countries}
                title='Edit host'
            />

            <ConfirmDialog
                open={!!deleteTarget}
                title='Delete host'
                message={`Are you sure you want to delete "${deleteTarget?.name} ${deleteTarget?.surname}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={() => { setDeleteTarget(null); setDeleteError(null); }}
                loading={deleteLoading}
                error={deleteError}
            />
        </Section>
    );
};

export default HostsPage;
