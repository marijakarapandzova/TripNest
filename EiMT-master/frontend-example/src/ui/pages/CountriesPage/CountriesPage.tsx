import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Alert, Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import useCountries from '../../../hooks/country/useCountries';
import type { Country, CreateCountryDto, EditCountryDto } from '../../../types/country';
import CountryFormDialog from '../../components/country/CountryFormDialog';
import CountryGrid from '../../components/country/CountryGrid';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import Section from '../../components/layout/Section/Section';
import Surface from '../../components/layout/Surface/Surface';

const CountriesPage = () => {
    const { isAdmin } = useAuth();
    const { countries, loading, error, createCountry, editCountry, deleteCountry } = useCountries();

    const [addOpen, setAddOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Country | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Country | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleCreate = async (data: CreateCountryDto | EditCountryDto) => {
        await createCountry(data as CreateCountryDto);
    };

    const handleEdit = async (data: CreateCountryDto | EditCountryDto) => {
        if (!editTarget) return;
        await editCountry(String(editTarget.id), data as EditCountryDto);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleteLoading(true);
        setDeleteError(null);
        try {
            await deleteCountry(String(deleteTarget.id));
            setDeleteTarget(null);
        } catch (err) {
            setDeleteError(err instanceof Error ? err.message : 'Delete failed. The item may have related records.');
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <Section>
            <PageHeader
                id='countries-heading'
                title='Countries & regions'
                subtitle='Explore where stays are rooted. Each card opens a country profile with continent context.'
                meta={
                    !loading && !error && countries.length > 0 ? (
                        <Typography variant='body2' sx={{ color: 'primary.main', fontWeight: 600 }}>
                            {countries.length} countr{countries.length === 1 ? 'y' : 'ies'} available
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
                            Add country
                        </Button>
                    ) : null
                }
            />

            {error && (
                <Alert severity='error' role='alert' sx={{ mt: 2, borderRadius: 2 }}>
                    {error.message}
                </Alert>
            )}

            {loading && (
                <Surface sx={{ display: 'grid', placeItems: 'center', minHeight: 280 }}>
                    <CircularProgress aria-label='Loading countries' />
                </Surface>
            )}

            {!loading && !error && countries.length === 0 && (
                <Alert severity='info' sx={{ mt: 2, borderRadius: 2 }}>
                    No countries are listed yet. Check back soon.
                </Alert>
            )}

            {!loading && !error && countries.length > 0 && (
                <CountryGrid
                    countries={countries}
                    onEdit={isAdmin ? setEditTarget : undefined}
                    onDelete={isAdmin ? setDeleteTarget : undefined}
                />
            )}

            <CountryFormDialog
                open={addOpen}
                onClose={() => setAddOpen(false)}
                onSubmit={handleCreate}
                title='Add country'
            />

            <CountryFormDialog
                open={!!editTarget}
                onClose={() => setEditTarget(null)}
                onSubmit={handleEdit}
                initialValues={editTarget ?? undefined}
                title='Edit country'
            />

            <ConfirmDialog
                open={!!deleteTarget}
                title='Delete country'
                message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={() => { setDeleteTarget(null); setDeleteError(null); }}
                loading={deleteLoading}
                error={deleteError}
            />
        </Section>
    );
};

export default CountriesPage;
