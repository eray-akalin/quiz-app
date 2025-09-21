import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Box,
    Grid,
    Chip
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/scores/history', {
                    withCredentials: true,
                });
                setHistory(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchHistory();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 5, px: 2, py: 4 }}>
            {/* Header Section */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" gutterBottom sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 2
                }}>
                    Quiz Dashboard
                </Typography>
                <Typography variant="h6" sx={{
                    color: 'white',
                    mb: 4,
                    fontSize: '1.2rem'
                }}>
                    Ready to test your knowledge?
                </Typography>

                {/* Action Cards */}
                <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            background: 'linear-gradient(145deg, #ffffff, #f8f9ff)',
                            borderRadius: 4,
                            boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3), 0 8px 16px rgba(0,0,0,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 25px 50px rgba(102, 126, 234, 0.4), 0 12px 20px rgba(0,0,0,0.15)'
                            }
                        }}>
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Typography variant="h2" sx={{ mb: 2 }}>🎯</Typography>
                                <Typography variant="h5" gutterBottom sx={{
                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 'bold'
                                }}>
                                    New Quiz
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                                    Take a new challenge
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate('/quiz')}
                                    sx={{
                                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                        py: 1.5,
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
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
                                    Start Quiz
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            background: 'linear-gradient(145deg, #ffffff, #f8f9ff)',
                            borderRadius: 4,
                            boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3), 0 8px 16px rgba(0,0,0,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 25px 50px rgba(102, 126, 234, 0.4), 0 12px 20px rgba(0,0,0,0.15)'
                            }
                        }}>
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Typography variant="h2" sx={{ mb: 2 }}>🏆</Typography>
                                <Typography variant="h5" gutterBottom sx={{
                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 'bold'
                                }}>
                                    Leaderboard
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                                    See top performers
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate('/leaderboard')}
                                    sx={{
                                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                        py: 1.5,
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
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
                                    View Rankings
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Quiz History Section */}
            <Box>
                <Typography variant="h4" gutterBottom sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 4,
                    textAlign: 'center'
                }}>
                    Your Quiz History
                </Typography>

                {history.length === 0 ? (
                    <Card sx={{
                        background: 'linear-gradient(145deg, #ffffff, #f8f9ff)',
                        borderRadius: 4,
                        boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3), 0 8px 16px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        overflow: 'hidden',
                        textAlign: 'center',
                        p: 6
                    }}>
                        <CardContent>
                            <Typography variant="h2" sx={{ mb: 3 }}>📚</Typography>
                            <Typography variant="h5" gutterBottom sx={{
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 'bold'
                            }}>
                                No Quiz History Yet
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
                                Start your first quiz to see your progress here!
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/quiz')}
                                sx={{
                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                    py: 2,
                                    px: 4,
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
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
                                Take Your First Quiz
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Grid container spacing={3}>
                        {history.map((entry, idx) => (
                            <Grid item xs={12} md={6} key={idx}>
                                <Card sx={{
                                    background: 'linear-gradient(145deg, #ffffff, #f8f9ff)',
                                    borderRadius: 4,
                                    boxShadow: '0 12px 24px rgba(102, 126, 234, 0.2), 0 4px 8px rgba(0,0,0,0.1)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 16px 32px rgba(102, 126, 234, 0.3), 0 8px 16px rgba(0,0,0,0.15)'
                                    }
                                }}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                            <Typography variant="h6" sx={{
                                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                backgroundClip: 'text',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                fontWeight: 'bold'
                                            }}>
                                                Quiz #{history.length - idx}
                                            </Typography>
                                            <Chip
                                                label={`${entry.totalScore.toFixed(0)} pts`}
                                                sx={{
                                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                    color: 'white',
                                                    fontWeight: 'bold'
                                                }}
                                            />
                                        </Box>

                                        <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
                                            📅 {new Date(entry.createdAt).toLocaleDateString()} at {new Date(entry.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </Typography>

                                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                            <Chip
                                                label={`${entry.answers.length} Questions`}
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                                    color: '#667eea',
                                                    fontWeight: 'medium'
                                                }}
                                            />
                                            <Chip
                                                label={`${entry.answers.filter(a => a.correct).length} Correct`}
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                                    color: '#10b981',
                                                    fontWeight: 'medium'
                                                }}
                                            />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );

};

export default Dashboard;
