import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Button,
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
        <Container
            maxWidth="md"
            sx={{
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: history.length === 0 ? 'center' : 'flex-start',
                height: history.length === 0 ? '70vh' : 'auto',
                px: 2,
                py: 4,
                bgcolor: '#e3f2fd',
                borderRadius: 3,
                boxShadow: 1
            }}
        >
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/quiz')}
                sx={{ mb: 3 }}
            >
                Start New Quiz
            </Button>

            {history.length === 0 ? (
                <Typography variant="h6">No quiz history found.</Typography>
            ) : (
                history.map((entry, idx) => (
                    <Card key={idx} sx={{ mb: 2, width: '100%' }}>
                        <CardContent>
                            <Typography variant="h6">
                                Quiz #{history.length - idx} – {new Date(entry.createdAt).toLocaleString()}
                            </Typography>
                            <Typography>Total Score: {entry.totalScore.toFixed(2)}</Typography>
                            <Typography>Answered Questions: {entry.answers.length}</Typography>
                        </CardContent>
                    </Card>
                ))
            )}
        </Container>
    );

};

export default Dashboard;
