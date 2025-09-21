import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack, Box } from '@mui/material';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:3000/api/users/logout', {
                withCredentials: true,
            });
            setUser(null);
            navigate('/login');
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <AppBar
            position="static"
            sx={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,249,255,0.95))',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)',
                borderBottom: '1px solid rgba(255,255,255,0.2)'
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/')}
                    >
                        🧠 QuizMaster
                    </Typography>
                </Box>

                {user ? (
                    <Stack direction="row" spacing={1}>
                        <Button
                            component={Link}
                            to="/"
                            sx={{
                                color: '#667eea',
                                fontWeight: 'medium',
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                    transform: 'translateY(-1px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Dashboard
                        </Button>
                        <Button
                            component={Link}
                            to="/quiz"
                            sx={{
                                color: '#667eea',
                                fontWeight: 'medium',
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                    transform: 'translateY(-1px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Quiz
                        </Button>
                        <Button
                            component={Link}
                            to="/result"
                            sx={{
                                color: '#667eea',
                                fontWeight: 'medium',
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                    transform: 'translateY(-1px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Results
                        </Button>
                        <Button
                            component={Link}
                            to="/leaderboard"
                            sx={{
                                color: '#667eea',
                                fontWeight: 'medium',
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                    transform: 'translateY(-1px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Leaderboard
                        </Button>
                        <Button
                            onClick={handleLogout}
                            sx={{
                                background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                                color: 'white',
                                fontWeight: 'medium',
                                px: 3,
                                py: 1,
                                borderRadius: 2,
                                ml: 1,
                                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #dc2626, #b91c1c)',
                                    boxShadow: '0 6px 16px rgba(239, 68, 68, 0.4)',
                                    transform: 'translateY(-1px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Logout
                        </Button>
                    </Stack>
                ) : (
                    <Button
                        onClick={() => navigate('/login')}
                        sx={{
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            color: 'white',
                            fontWeight: 'bold',
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
                                boxShadow: '0 12px 24px rgba(102, 126, 234, 0.5)',
                                transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Get Started
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;