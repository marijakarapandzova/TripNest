import {
    Alert,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { Country, CreateCountryDto, EditCountryDto } from '../../../types/country';

interface CountryFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateCountryDto | EditCountryDto) => Promise<void>;
    initialValues?: Country;
    title: string;
}

const defaultForm = { name: '', continent: '' };

const CountryFormDialog = ({
    open,
    onClose,
    onSubmit,
    initialValues,
    title,
}: CountryFormDialogProps) => {
    const [form, setForm] = useState(defaultForm);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            setError(null);
            setForm(initialValues ? { name: initialValues.name, continent: initialValues.continent } : defaultForm);
        }
    }, [open, initialValues]);

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(null);
        try {
            await onSubmit(form);
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Stack spacing={2.5} sx={{ pt: 1 }}>
                    {error && <Alert severity='error' onClose={() => setError(null)}>{error}</Alert>}
                    <TextField
                        label='Country name'
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        required
                        fullWidth
                    />
                    <TextField
                        label='Continent'
                        value={form.continent}
                        onChange={(e) => setForm((p) => ({ ...p, continent: e.target.value }))}
                        required
                        fullWidth
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} disabled={submitting}>Cancel</Button>
                <Button
                    variant='contained'
                    disabled={submitting}
                    onClick={handleSubmit}
                >
                    {submitting ? <CircularProgress size={18} color='inherit' /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CountryFormDialog;
