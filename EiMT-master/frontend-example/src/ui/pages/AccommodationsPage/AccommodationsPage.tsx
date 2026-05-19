import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Alert, Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import accommodationApi from '../../../api/accommodationApi';
import { useAuth } from '../../../hooks/useAuth';
import useAccommodations from '../../../hooks/accommodation/useAccommodations';
import useHosts from '../../../hooks/host/useHosts';
import type { Accommodation, AccommodationDetails, CreateAccommodationDto, EditAccommodationDto } from '../../../types/accommodation';
import AccommodationFormDialog from '../../components/accommodation/AccommodationFormDialog';
import AccommodationGrid from '../../components/accommodation/AccommodationGrid';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import Section from '../../components/layout/Section/Section';
import Surface from '../../components/layout/Surface/Surface';

const AccommodationsPage = () => {
    const { isAdmin } = useAuth();
    const { accommodations, loading, error, createAccommodation, editAccommodation, deleteAccommodation } = useAccommodations();
    const { hosts } = useHosts();

    const [addOpen, setAddOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<AccommodationDetails | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Accommodation | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [editLoading, setEditLoading] = useState(false);

    const availableCount = accommodations.filter((a) => !a.rented).length;

    const handleEditClick = async (accommodation: Accommodation) => {
        setEditLoading(true);
        try {
            const response = await accommodationApi.findById(String(accommodation.id));
            setEditTarget(response.data as AccommodationDetails);
        } finally {
            setEditLoading(false);
        }
    };

    const handleCreate = async (data: CreateAccommodationDto | EditAccommodationDto) => {
        await createAccommodation(data as CreateAccommodationDto);
    };

    const handleEdit = async (data: CreateAccommodationDto | EditAccommodationDto) => {
        if (!editTarget) return;
        await editAccommodation(String(editTarget.id), data as EditAccommodationDto);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleteLoading(true);
        setDeleteError(null);
        try {
            await deleteAccommodation(String(deleteTarget.id));
            setDeleteTarget(null);
        } catch (err) {
            setDeleteError(err instanceof Error ? err.message : 'Delete failed. Please try again.');
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <Section>
            <PageHeader
                id='stays-heading'
                title='Discover your next stay'
                subtitle='Browse curated accommodations, compare availability, and open any listing for full details and booking info.'
                meta={
                    !loading && !error && accommodations.length > 0 ? (
                        <Typography variant='body2' sx={{ color: 'primary.main', fontWeight: 600 }}>
                            {availableCount} of {accommodations.length} stays currently available
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
                            Add accommodation
                        </Button>
                    ) : null
                }
            />

            {error && <Alert severity='error' role='alert'>{error.message}</Alert>}

            {(loading || editLoading) && (
                <Surface sx={{ display: 'grid', placeItems: 'center', minHeight: 280 }}>
                    <CircularProgress aria-label='Loading stays' />
                </Surface>
            )}

            {!loading && !error && accommodations.length === 0 && (
                <Alert severity='info'>No stays are listed yet. Check back soon.</Alert>
            )}

            {!loading && accommodations.length > 0 && (
                <AccommodationGrid
                    accommodations={accommodations}
                    onEdit={isAdmin ? handleEditClick : undefined}
                    onDelete={isAdmin ? setDeleteTarget : undefined}
                />
            )}

            <AccommodationFormDialog
                open={addOpen}
                onClose={() => setAddOpen(false)}
                onSubmit={handleCreate}
                hosts={hosts}
                title='Add accommodation'
            />

            <AccommodationFormDialog
                open={!!editTarget}
                onClose={() => setEditTarget(null)}
                onSubmit={handleEdit}
                initialValues={editTarget ?? undefined}
                hosts={hosts}
                title='Edit accommodation'
            />

            <ConfirmDialog
                open={!!deleteTarget}
                title='Delete accommodation'
                message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={() => { setDeleteTarget(null); setDeleteError(null); }}
                loading={deleteLoading}
                error={deleteError}
            />
        </Section>
    );
};

export default AccommodationsPage;
