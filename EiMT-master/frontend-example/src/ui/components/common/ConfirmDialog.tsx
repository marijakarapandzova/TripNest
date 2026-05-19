import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
    error?: string | null;
}

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel, loading, error }: ConfirmDialogProps) => (
    <Dialog open={open} onClose={onCancel} maxWidth='xs' fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            {error && <Alert severity='error' sx={{ mb: 1.5 }}>{error}</Alert>}
            <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={onCancel} disabled={loading}>Cancel</Button>
            <Button onClick={onConfirm} color='error' variant='contained' disabled={loading}>
                {loading ? <CircularProgress size={18} color='inherit' /> : 'Delete'}
            </Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmDialog;
