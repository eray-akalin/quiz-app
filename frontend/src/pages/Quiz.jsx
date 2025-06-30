import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Radio,
    RadioGroup,
    FormControlLabel,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [started, setStarted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/quiz/start', {
                    withCredentials: true,
                });
                setQuestions(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchQuestions();
    }, []);

    // Start time ayarı yalnızca başladıktan sonra aktif
    useEffect(() => {
        if (started && questions.length > 0 && current < questions.length) {
            const questionId = questions[current]._id;

            axios
                .post('http://localhost:3000/api/quiz/set-start', { questionId }, {
                    withCredentials: true,
                })
                .then(() => {
                    console.log(`⏱ Start time set for Q${current + 1}`);
                })
                .catch((err) => console.error('Set start error:', err));
        }
    }, [current, questions, started]);

    const handleAnswer = async () => {
        if (!selected) return;
        const q = questions[current];

        try {
            const res = await axios.post(
                'http://localhost:3000/api/quiz/answer',
                {
                    questionId: q._id,
                    selectedAnswer: selected,
                },
                { withCredentials: true }
            );

            setFeedback(res.data);
            setAnswers([
                ...answers,
                {
                    questionId: q._id,
                    selectedAnswer: selected,
                    ...res.data,
                },
            ]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleNext = () => {
        setFeedback(null);
        setSelected('');
        setCurrent((prev) => prev + 1);
    };

    const handleFinish = async () => {
        try {
            await axios.post(
                'http://localhost:3000/api/scores/submit',
                { answers },
                { withCredentials: true }
            );
            navigate('/result');
        } catch (err) {
            console.error('submit error:', err);
        }
    };

    if (questions.length === 0) return <div>Loading...</div>;

    if (!started) {
        return (
            <Container maxWidth="sm" sx={{
                mt: 15, mt: 5,
                px: 2,
                py: 4,
                bgcolor: '#e3f2fd',
                borderRadius: 3,
                boxShadow: 1
            }}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Ready to start your quiz?
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => setStarted(true)}
                        >
                            Start Quiz
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        );
    }

    if (current >= questions.length) {
        return (
            <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh', // veya '100vh' tam ortalamak için 
                    mt: 5,
                    px: 2,
                    py: 4,
                    bgcolor: '#e3f2fd',
                    borderRadius: 3,
                    boxShadow: 1
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Quiz Completed
                </Typography>
                <Button variant="contained" onClick={handleFinish}>
                    See Results
                </Button>
            </Container>
        );
    }


    const q = questions[current];

    return (
        <Container maxWidth="sm" sx={{
            mt: 5,
            px: 2,
            py: 4,
            bgcolor: '#e3f2fd',
            borderRadius: 3,
            boxShadow: 1
        }}>
            <Card sx={{ mt: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Question {current + 1}/{questions.length}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {q.question}
                    </Typography>
                    <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)}>
                        {q.options.map((opt, i) => (
                            <FormControlLabel key={i} value={opt} control={<Radio />} label={opt} />
                        ))}
                    </RadioGroup>

                    {/* 
                        {feedback && (
                        <Alert severity={feedback.correct ? 'success' : 'error'} sx={{ mt: 2 }}>
                            {feedback.correct ? 'Correct!' : 'Wrong!'} Score: {feedback.score.toFixed(2)}
                        </Alert>
                                    )} 
                        */}

                    {!feedback ? (
                        <Button
                            disabled={!selected}
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleAnswer}
                        >
                            Submit Answer
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default Quiz;
