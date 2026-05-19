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
import useLogin from '../../../hooks/user/userLogin';

const LoginPage = () => {
    const { login, loading, error } = useLogin();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        void login({ username, password });
    };

    return (
        <Container maxWidth='sm' sx={{ py: 8 }}>
            <Paper elevation={0} sx={{ p: 4, border: 1, borderColor: 'divider', borderRadius: 3 }}>
                <Typography variant='h4' sx={{ fontWeight: 700, mb: 0.75 }}>Welcome back</Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary', mb: 3 }}>
                    Sign in to your account to continue.
                </Typography>

                {error && <Alert severity='error' sx={{ mb: 2 }}>{error.message}</Alert>}

                <Box component='form' onSubmit={handleSubmit}>
                    <Stack spacing={2.5}>
                        <TextField
                            label='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            fullWidth
                            autoComplete='username'
                        />
                        <TextField
                            label='Password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                            autoComplete='current-password'
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            size='large'
                            disabled={loading}
                            fullWidth
                            sx={{ borderRadius: 2 }}
                        >
                            {loading ? <CircularProgress size={22} color='inherit' /> : 'Sign in'}
                        </Button>
                    </Stack>
                </Box>

                <Typography variant='body2' sx={{ color: 'text.secondary', mt: 2.5, textAlign: 'center' }}>
                    Don&apos;t have an account?{' '}
                    <RouterLink to='/register' style={{ fontWeight: 600 }}>Register</RouterLink>
                </Typography>
            </Paper>
        </Container>
    );
};

export default LoginPage;
