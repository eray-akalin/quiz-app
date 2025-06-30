import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();

    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/api/users/register', form, {
                withCredentials: true,
            });

            setUser({ username: form.username }); // veya res.data.user döndürüyorsa onu kullan
            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Registration failed');
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
                Register
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
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
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
                    Register
                </Button>
            </form>
        </Container>
    );
};

export default Register;
