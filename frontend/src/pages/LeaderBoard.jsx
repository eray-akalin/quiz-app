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

    return (
        <Container maxWidth="md" sx={{
            mt: 4, mt: 5,
            px: 2,
            py: 4,
            bgcolor: '#e3f2fd',
            borderRadius: 3,
            boxShadow: 1
        }}>
            <Typography variant="h4" gutterBottom>
                Leaderboard
            </Typography>

            <Card component={Paper}>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Rank</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Total Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scores.map((user, index) => (
                                <TableRow key={user.username}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.totalScore.toFixed(2)}</TableCell>
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
