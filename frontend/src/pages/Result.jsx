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

    if (error) return <Alert severity="warning">{error}</Alert>;

    if (!lastResult) return <div>Loading...</div>;

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
                Quiz Result
            </Typography>

            <Card>
                <CardContent>
                    <Typography variant="h6">Total Score: {lastResult.totalScore.toFixed(2)}</Typography>
                    <List>
                        {lastResult.answers.map((ans, i) => (
                            <React.Fragment key={i}>
                                <ListItem>
                                    <ListItemText
                                        primary={`Q${i + 1}: ${ans.correct ? ' Correct' : ' Wrong'}`}
                                        secondary={`Answer: ${ans.selectedAnswer} | Score: ${ans.score.toFixed(
                                            2
                                        )} | Time: ${ans.time.toFixed(1)}s`}
                                    />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Result;
