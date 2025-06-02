import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { TextField, Button, Container, Box, Typhography } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{mt: 8, display:"flex", flexDirection:"column", alignItems:"center" }}>
                <Typhography component="h1" variant="h5">Login</Typhography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>

                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;