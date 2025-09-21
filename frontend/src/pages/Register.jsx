import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert, Card, CardContent, Box } from '@mui/material';
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
        <Container maxWidth="sm" sx={{
            mt: 8,
            px: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh'
        }}>
            <Card sx={{
                width: '100%',
                maxWidth: 450,
                background: 'linear-gradient(145deg, #ffffff, #f8f9ff)',
                borderRadius: 4,
                boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3), 0 8px 16px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                overflow: 'hidden'
            }}>
                <CardContent sx={{ p: 5 }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h3" gutterBottom sx={{
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold',
                            mb: 2
                        }}>
                            Join the Quiz
                        </Typography>
                        <Typography variant="body1" sx={{
                            color: '#64748b',
                            fontSize: '1.1rem'
                        }}>
                            Create your account and start challenging yourself
                        </Typography>
                    </Box>

                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 3,
                                borderRadius: 2,
                                '& .MuiAlert-message': {
                                    fontSize: '0.95rem'
                                }
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            margin="normal"
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#667eea'
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#667eea'
                                    }
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#667eea'
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            margin="normal"
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#667eea'
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#667eea'
                                    }
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#667eea'
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            margin="normal"
                            sx={{
                                mb: 4,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#667eea'
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#667eea'
                                    }
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#667eea'
                                }
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                py: 2,
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                borderRadius: 3,
                                boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                                mb: 3,
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
                                    boxShadow: '0 12px 24px rgba(102, 126, 234, 0.5)',
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Create Account
                        </Button>

                        <Button
                            fullWidth
                            variant="text"
                            onClick={() => navigate('/login')}
                            sx={{
                                color: '#667eea',
                                fontSize: '1rem',
                                fontWeight: 'medium',
                                py: 1.5,
                                '&:hover': {
                                    backgroundColor: 'rgba(102, 126, 234, 0.1)'
                                }
                            }}
                        >
                            Already have an account? Sign in
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Register;
