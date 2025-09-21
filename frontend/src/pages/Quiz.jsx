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
                mt: 5,
                px: 2,
                py: 4,
            }}>
                <Card sx={{
                    background: 'linear-gradient(145deg, #ffffff, #f8f9ff)',
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3), 0 8px 16px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    overflow: 'hidden'
                }}>
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h4" gutterBottom sx={{
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold',
                            mb: 3
                        }}>
                            Ready to Challenge Yourself?
                        </Typography>
                        <Typography variant="body1" sx={{
                            color: '#64748b',
                            mb: 4,
                            fontSize: '1.1rem'
                        }}>
                            Test your knowledge with 10 exciting questions!
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => setStarted(true)}
                            sx={{
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                py: 2,
                                fontSize: '1.2rem',
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
                    height: '80vh',
                    mt: 5,
                    px: 2,
                    py: 4,
                }}
            >
                <Card sx={{
                    background: 'linear-gradient(145deg, #ffffff, #f8f9ff)',
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3), 0 8px 16px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    overflow: 'hidden',
                    textAlign: 'center',
                    p: 4
                }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom sx={{
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold',
                            mb: 3
                        }}>
                            Quiz Completed! 🎉
                        </Typography>
                        <Typography variant="body1" sx={{
                            color: '#64748b',
                            mb: 4,
                            fontSize: '1.1rem'
                        }}>
                            Great job! Let's see how you performed.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleFinish}
                            sx={{
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                py: 2,
                                px: 4,
                                fontSize: '1.2rem',
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
                            See Results
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        );
    }


    const q = questions[current];

    return (
        <Container maxWidth="sm" sx={{
            mt: 5,
            px: 2,
            py: 4,
        }}>
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
                        mb: 1
                    }}>
                        Question {current + 1}/{questions.length}
                    </Typography>

                    <Card sx={{
                        mb: 3,
                        background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                        borderRadius: 3,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.5)'
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{
                                color: '#334155',
                                fontWeight: 'medium',
                                lineHeight: 1.4
                            }}>
                                {q.question}
                            </Typography>
                        </CardContent>
                    </Card>

                    <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)} sx={{ mb: 3 }}>
                        {q.options.map((opt, i) => (
                            <Card key={i} sx={{
                                mb: 1.5,
                                background: selected === opt
                                    ? 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))'
                                    : 'rgba(255,255,255,0.8)',
                                borderRadius: 2,
                                boxShadow: selected === opt
                                    ? '0 4px 12px rgba(102, 126, 234, 0.2)'
                                    : '0 2px 8px rgba(0,0,0,0.05)',
                                border: selected === opt
                                    ? '2px solid #667eea'
                                    : '1px solid rgba(255,255,255,0.3)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 6px 16px rgba(102, 126, 234, 0.15)',
                                    transform: 'translateY(-1px)'
                                }
                            }}>
                                <FormControlLabel
                                    value={opt}
                                    control={<Radio sx={{
                                        color: '#667eea',
                                        '&.Mui-checked': {
                                            color: '#667eea'
                                        }
                                    }} />}
                                    label={opt}
                                    sx={{
                                        margin: 0,
                                        padding: 2,
                                        width: '100%',
                                        '& .MuiFormControlLabel-label': {
                                            fontSize: '1rem',
                                            color: '#334155',
                                            fontWeight: selected === opt ? 'medium' : 'normal'
                                        }
                                    }}
                                />
                            </Card>
                        ))}
                    </RadioGroup>

                    {!feedback ? (
                        <Button
                            disabled={!selected}
                            variant="contained"
                            fullWidth
                            onClick={handleAnswer}
                            sx={{
                                background: selected
                                    ? 'linear-gradient(45deg, #667eea, #764ba2)'
                                    : 'linear-gradient(45deg, #94a3b8, #cbd5e1)',
                                py: 2,
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                borderRadius: 3,
                                boxShadow: selected
                                    ? '0 8px 20px rgba(102, 126, 234, 0.4)'
                                    : '0 4px 12px rgba(0,0,0,0.1)',
                                '&:hover': {
                                    background: selected
                                        ? 'linear-gradient(45deg, #5a6fd8, #6a4190)'
                                        : 'linear-gradient(45deg, #94a3b8, #cbd5e1)',
                                    boxShadow: selected
                                        ? '0 12px 24px rgba(102, 126, 234, 0.5)'
                                        : '0 4px 12px rgba(0,0,0,0.1)',
                                    transform: selected ? 'translateY(-2px)' : 'none'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Submit Answer
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleNext}
                            sx={{
                                background: 'linear-gradient(45deg, #10b981, #059669)',
                                py: 2,
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                borderRadius: 3,
                                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #059669, #047857)',
                                    boxShadow: '0 12px 24px rgba(16, 185, 129, 0.5)',
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Next Question →
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default Quiz;
