import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Divider,
    Alert,
    Box,
    Chip,
    Grid,
    LinearProgress
} from '@mui/material';
import axios from 'axios';

const Result = () => {
    const [lastResult, setLastResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/scores/history', {
                    withCredentials: true,
                });

                if (res.data.length === 0) {
                    setError("You don't have any quiz results yet.");
                } else {
                    setLastResult(res.data[0]); // en son çözülmüş quiz
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch results.');
            }
        };

        fetchHistory();
    }, []);

    if (error) return (
        <Container maxWidth="sm" sx={{ mt: 8, px: 2 }}>
            <Alert
                severity="warning"
                sx={{
                    borderRadius: 3,
                    '& .MuiAlert-message': {
                        fontSize: '1rem'
                    }
                }}
            >
                {error}
            </Alert>
        </Container>
    );

    if (!lastResult) return (
        <Container maxWidth="sm" sx={{ mt: 8, px: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#64748b' }}>Loading...</Typography>
        </Container>
    );

    const correctAnswers = lastResult.answers.filter(ans => ans.correct).length;
    const accuracy = (correctAnswers / lastResult.answers.length) * 100;
    const averageTime = lastResult.answers.reduce((sum, ans) => sum + ans.time, 0) / lastResult.answers.length;

    return (
        <Container maxWidth="lg" sx={{ mt: 5, px: 2, py: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" gutterBottom sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 2
                }}>
                    🏆 Quiz Results
                </Typography>
                <Typography variant="h6" sx={{
                    color: 'white',
                    fontSize: '1.2rem'
                }}>
                    Your latest quiz performance
                </Typography>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
                <Grid item xs={12} md={3}>
                    <Card sx={{
                        background: 'linear-gradient(145deg, #ffffff, #f8f9ff)',
                        borderRadius: 4,
                        boxShadow: '0 12px 24px rgba(102, 126, 234, 0.2), 0 4px 8px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        textAlign: 'center',
                        p: 3
                    }}>
                        <Typography variant="h2" sx={{ mb: 1 }}>🎯</Typography>
                        <Typography variant="h4" sx={{
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold'
                        }}>
                            {lastResult.totalScore.toFixed(0)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>Total Score</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card sx={{
                        background: 'linear-gradient(145deg, #ffffff, #f8f9ff)',
                        borderRadius: 4,
                        boxShadow: '0 12px 24px rgba(102, 126, 234, 0.2), 0 4px 8px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        textAlign: 'center',
                        p: 3
                    }}>
                        <Typography variant="h2" sx={{ mb: 1 }}>✓</Typography>
                        <Typography variant="h4" sx={{
                            background: 'linear-gradient(45deg, #10b981, #059669)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold'
                        }}>
                            {correctAnswers}/{lastResult.answers.length}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>Correct Answers</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card sx={{
                        background: 'linear-gradient(145deg, #ffffff, #f8f9ff)',
                        borderRadius: 4,
                        boxShadow: '0 12px 24px rgba(102, 126, 234, 0.2), 0 4px 8px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        textAlign: 'center',
                        p: 3
                    }}>
                        <Typography variant="h2" sx={{ mb: 1 }}>📊</Typography>
                        <Typography variant="h4" sx={{
                            background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold'
                        }}>
                            {accuracy.toFixed(0)}%
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>Accuracy</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card sx={{
                        background: 'linear-gradient(145deg, #ffffff, #f8f9ff)',
                        borderRadius: 4,
                        boxShadow: '0 12px 24px rgba(102, 126, 234, 0.2), 0 4px 8px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        textAlign: 'center',
                        p: 3
                    }}>
                        <Typography variant="h2" sx={{ mb: 1 }}>⏱️</Typography>
                        <Typography variant="h4" sx={{
                            background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold'
                        }}>
                            {averageTime.toFixed(1)}s
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>Avg Time</Typography>
                    </Card>
                </Grid>
            </Grid>

            {/* Detailed Results */}
            <Card sx={{
                background: 'linear-gradient(145deg, #ffffff, #f8f9ff)',
                borderRadius: 4,
                boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3), 0 8px 16px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                overflow: 'hidden'
            }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                        mb: 4
                    }}>
                        Question Details
                    </Typography>

                    <List sx={{ p: 0 }}>
                        {lastResult.answers.map((ans, i) => (
                            <React.Fragment key={i}>
                                <ListItem sx={{
                                    background: ans.correct
                                        ? 'linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))'
                                        : 'linear-gradient(145deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05))',
                                    borderRadius: 3,
                                    mb: 2,
                                    border: ans.correct
                                        ? '1px solid rgba(16, 185, 129, 0.2)'
                                        : '1px solid rgba(239, 68, 68, 0.2)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                                    }
                                }}>
                                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="h6" sx={{
                                            background: ans.correct
                                                ? 'linear-gradient(45deg, #10b981, #059669)'
                                                : 'linear-gradient(45deg, #ef4444, #dc2626)',
                                            color: 'white',
                                            borderRadius: '50%',
                                            width: 40,
                                            height: 40,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            flexShrink: 0
                                        }}>
                                            {i + 1}
                                        </Typography>

                                        <Box sx={{ flexGrow: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                                <Chip
                                                    label={ans.correct ? 'Correct' : 'Wrong'}
                                                    sx={{
                                                        background: ans.correct
                                                            ? 'linear-gradient(45deg, #10b981, #059669)'
                                                            : 'linear-gradient(45deg, #ef4444, #dc2626)',
                                                        color: 'white',
                                                        fontWeight: 'bold'
                                                    }}
                                                />
                                                <Chip
                                                    label={`${ans.score.toFixed(0)} pts`}
                                                    sx={{
                                                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                        color: 'white',
                                                        fontWeight: 'bold'
                                                    }}
                                                />
                                                <Chip
                                                    label={`${ans.time.toFixed(1)}s`}
                                                    sx={{
                                                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                                        color: '#667eea',
                                                        fontWeight: 'medium'
                                                    }}
                                                />
                                            </Box>
                                            <Typography variant="body1" sx={{
                                                color: '#334155',
                                                fontWeight: 'medium'
                                            }}>
                                                Answer: {ans.selectedAnswer}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Result;
