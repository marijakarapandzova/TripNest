import {
    Alert,
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { AccommodationDetails, CreateAccommodationDto, EditAccommodationDto } from '../../../types/accommodation';
import { Category } from '../../../types/enums/category';
import { Condition } from '../../../types/enums/condition';
import type { Host } from '../../../types/host';

interface AccommodationFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateAccommodationDto | EditAccommodationDto) => Promise<void>;
    initialValues?: AccommodationDetails;
    hosts: Host[];
    title: string;
}

const categoryOptions = [
    { value: Category.ROOM, label: 'Room' },
    { value: Category.HOUSE, label: 'House' },
    { value: Category.FLAT, label: 'Flat' },
    { value: Category.APARTMENT, label: 'Apartment' },
    { value: Category.HOTEL, label: 'Hotel' },
    { value: Category.MOTEL, label: 'Motel' },
];

const conditionOptions = [
    { value: Condition.GOOD, label: 'Good' },
    { value: Condition.BAD, label: 'Bad' },
];

const defaultForm = {
    name: '',
    category: Category.ROOM,
    hostId: 0,
    condition: Condition.GOOD,
    numRooms: 1,
    rented: false,
};

const AccommodationFormDialog = ({
    open,
    onClose,
    onSubmit,
    initialValues,
    hosts,
    title,
}: AccommodationFormDialogProps) => {
    const [form, setForm] = useState(defaultForm);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            setError(null);
            if (initialValues) {
                setForm({
                    name: initialValues.name,
                    category: initialValues.category,
                    hostId: initialValues.host_id,
                    condition: initialValues.condition,
                    numRooms: initialValues.numRooms,
                    rented: initialValues.rented,
                });
            } else {
                setForm({ ...defaultForm, hostId: hosts[0]?.id ?? 0 });
            }
        }
    }, [open, initialValues, hosts]);

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
                        label='Name'
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        required
                        fullWidth
                    />

                    <FormControl fullWidth required>
                        <InputLabel>Category</InputLabel>
                        <Select
                            label='Category'
                            value={form.category}
                            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as Category }))}
                        >
                            {categoryOptions.map((o) => (
                                <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth required>
                        <InputLabel>Host</InputLabel>
                        <Select
                            label='Host'
                            value={form.hostId}
                            onChange={(e) => setForm((p) => ({ ...p, hostId: Number(e.target.value) }))}
                        >
                            {hosts.map((h) => (
                                <MenuItem key={h.id} value={h.id}>{h.name} {h.surname}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth required>
                        <InputLabel>Condition</InputLabel>
                        <Select
                            label='Condition'
                            value={form.condition}
                            onChange={(e) => setForm((p) => ({ ...p, condition: e.target.value as Condition }))}
                        >
                            {conditionOptions.map((o) => (
                                <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label='Number of rooms'
                        type='number'
                        value={form.numRooms}
                        onChange={(e) => setForm((p) => ({ ...p, numRooms: Math.max(0, Number(e.target.value)) }))}
                        slotProps={{ htmlInput: { min: 0 } }}
                        required
                        fullWidth
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.rented}
                                onChange={(e) => setForm((p) => ({ ...p, rented: e.target.checked }))}
                            />
                        }
                        label='Currently rented'
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} disabled={submitting}>Cancel</Button>
                <Button
                    variant='contained'
                    disabled={submitting || hosts.length === 0}
                    onClick={handleSubmit}
                >
                    {submitting ? <CircularProgress size={18} color='inherit' /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AccommodationFormDialog;
