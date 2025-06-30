import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
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
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6">Quiz App</Typography>

                {user ? (
                    <Stack direction="row" spacing={2}>
                        <Button color="inherit" component={Link} to="/">Dashboard</Button>
                        <Button color="inherit" component={Link} to="/quiz">Quiz</Button>
                        <Button color="inherit" component={Link} to="/result">Last quiz</Button>
                        <Button color="inherit" component={Link} to="/leaderboard">Leaderboard</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Stack>
                ) : (
                    <Button color="inherit" onClick={() => navigate('/login')}>
                        WELCOME
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;