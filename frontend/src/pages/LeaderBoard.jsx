import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Box,
    Chip,
    Avatar
} from '@mui/material';
import axios from 'axios';

const Leaderboard = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/scores/leaderboard');
                setScores(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchLeaderboard();
    }, []);

    const getRankIcon = (index) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return `#${index + 1}`;
    };

    const getRankColor = (index) => {
        if (index === 0) return '#ffd700';
        if (index === 1) return '#c0c0c0';
        if (index === 2) return '#cd7f32';
        return '#667eea';
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5, px: 2, py: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" gutterBottom sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 2
                }}>
                    🏆 Leaderboard
                </Typography>
                <Typography variant="h6" sx={{
                    color: 'white',
                    fontSize: '1.2rem'
                }}>
                    Top performers across all quizzes
                </Typography>
            </Box>

            <Card sx={{
                background: 'linear-gradient(145deg, #ffffff, #f8f9ff)',
                borderRadius: 4,
                boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3), 0 8px 16px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                overflow: 'hidden'
            }}>
                <CardContent sx={{ p: 0 }}>
                    <Table sx={{
                        '& .MuiTableHead-root': {
                            background: 'linear-gradient(135deg, #667eea, #764ba2)'
                        }
                    }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    py: 3
                                }}>Rank</TableCell>
                                <TableCell sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    py: 3
                                }}>Player</TableCell>
                                <TableCell sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    py: 3
                                }}>Email</TableCell>
                                <TableCell sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    py: 3
                                }}>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scores.map((user, index) => (
                                <TableRow key={user.username} sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(102, 126, 234, 0.05)',
                                        transform: 'scale(1.02)'
                                    },
                                    transition: 'all 0.3s ease',
                                    borderBottom: index === scores.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.1)'
                                }}>
                                    <TableCell sx={{ py: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{
                                                backgroundColor: getRankColor(index),
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '1.2rem'
                                            }}>
                                                {index < 3 ? getRankIcon(index) : index + 1}
                                            </Avatar>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ py: 3 }}>
                                        <Typography variant="h6" sx={{
                                            fontWeight: 'bold',
                                            color: '#334155'
                                        }}>
                                            {user.username}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ py: 3 }}>
                                        <Typography sx={{ color: '#64748b' }}>
                                            {user.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ py: 3 }}>
                                        <Chip
                                            label={`${user.totalScore.toFixed(0)} pts`}
                                            sx={{
                                                background: index < 3
                                                    ? `linear-gradient(45deg, ${getRankColor(index)}, ${getRankColor(index)}cc)`
                                                    : 'linear-gradient(45deg, #667eea, #764ba2)',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                px: 2,
                                                py: 1
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Leaderboard;
