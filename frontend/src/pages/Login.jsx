import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();

    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/api/users/login', form, {
                withCredentials: true,
            });

            setUser(res.data.user);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container maxWidth="xs" sx={{
            mt: 6,
            px: 3,
            py: 5,
            bgcolor: '#e3f2fd',
            borderRadius: 3,
            boxShadow: 2
        }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ mt: 2 }}>
                Login
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    margin="normal"
                />

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                    Login
                </Button>

                <Button
                    fullWidth
                    variant="text"
                    sx={{ mt: 1 }}
                    onClick={() => navigate('/register')}
                >
                    Don't have an account? Register
                </Button>

                <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => {
                        window.location.href = 'http://localhost:3000/api/users/google';
                    }}
                >
                    Sign in with Google
                </Button>
            </form>
        </Container>
    );
};

export default Login; 