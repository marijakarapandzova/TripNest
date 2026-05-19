import {
    Alert,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { CreateHostDto, EditHostDto, Host } from '../../../types/host';
import type { Country } from '../../../types/country';

interface HostFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateHostDto | EditHostDto) => Promise<void>;
    initialValues?: Host;
    countries: Country[];
    title: string;
}

const defaultForm = {
    name: '',
    surname: '',
    countryId: 0,
};

const HostFormDialog = ({
    open,
    onClose,
    onSubmit,
    initialValues,
    countries,
    title,
}: HostFormDialogProps) => {
    const [form, setForm] = useState(defaultForm);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            setError(null);
            if (initialValues) {
                setForm({
                    name: initialValues.name,
                    surname: initialValues.surname,
                    countryId: initialValues.country_id,
                });
            } else {
                setForm({ ...defaultForm, countryId: countries[0]?.id ?? 0 });
            }
        }
    }, [open, initialValues, countries]);

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
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Stack spacing={2.5} sx={{ pt: 1 }}>
                    {error && <Alert severity='error' onClose={() => setError(null)}>{error}</Alert>}
                    <TextField
                        label='First name'
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        required
                        fullWidth
                    />
                    <TextField
                        label='Last name'
                        value={form.surname}
                        onChange={(e) => setForm((p) => ({ ...p, surname: e.target.value }))}
                        required
                        fullWidth
                    />
                    <FormControl fullWidth required>
                        <InputLabel>Country</InputLabel>
                        <Select
                            label='Country'
                            value={form.countryId}
                            onChange={(e) => setForm((p) => ({ ...p, countryId: Number(e.target.value) }))}
                        >
                            {countries.map((c) => (
                                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} disabled={submitting}>Cancel</Button>
                <Button
                    variant='contained'
                    disabled={submitting || countries.length === 0}
                    onClick={handleSubmit}
                >
                    {submitting ? <CircularProgress size={18} color='inherit' /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default HostFormDialog;
