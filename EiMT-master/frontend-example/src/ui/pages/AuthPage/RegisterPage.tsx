import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import useRegister from '../../../hooks/user/userRegister';

const RegisterPage = () => {
    const { register, loading, error } = useRegister();
    const [form, setForm] = useState({
        username: '',
        password: '',
        name: '',
        surname: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        void register(form);
    };

    return (
        <Container maxWidth='sm' sx={{ py: 8 }}>
            <Paper elevation={0} sx={{ p: 4, border: 1, borderColor: 'divider', borderRadius: 3 }}>
                <Typography variant='h4' sx={{ fontWeight: 700, mb: 0.75 }}>Create an account</Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary', mb: 3 }}>
                    Join TripNest and start exploring.
                </Typography>

                {error && <Alert severity='error' sx={{ mb: 2 }}>{error.message}</Alert>}

                <Box component='form' onSubmit={handleSubmit}>
                    <Stack spacing={2.5}>
                        <TextField
                            label='Username'
                            name='username'
                            value={form.username}
                            onChange={handleChange}
                            required
                            fullWidth
                            autoComplete='username'
                        />
                        <TextField
                            label='Password'
                            name='password'
                            type='password'
                            value={form.password}
                            onChange={handleChange}
                            required
                            fullWidth
                            autoComplete='new-password'
                        />
                        <Stack direction='row' spacing={2}>
                            <TextField
                                label='First name'
                                name='name'
                                value={form.name}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            <TextField
                                label='Last name'
                                name='surname'
                                value={form.surname}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                        </Stack>
                        <TextField
                            label='Email'
                            name='email'
                            type='email'
                            value={form.email}
                            onChange={handleChange}
                            required
                            fullWidth
                            autoComplete='email'
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            size='large'
                            disabled={loading}
                            fullWidth
                            sx={{ borderRadius: 2 }}
                        >
                            {loading ? <CircularProgress size={22} color='inherit' /> : 'Create account'}
                        </Button>
                    </Stack>
                </Box>

                <Typography variant='body2' sx={{ color: 'text.secondary', mt: 2.5, textAlign: 'center' }}>
                    Already have an account?{' '}
                    <RouterLink to='/login' style={{ fontWeight: 600 }}>Sign in</RouterLink>
                </Typography>
            </Paper>
        </Container>
    );
};

export default RegisterPage;
