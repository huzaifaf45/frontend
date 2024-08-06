import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Ecommerce from '../assets/Ecommerce.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/user/login', formData);
            const data = response.data;

            // Save user to local storage
            localStorage.setItem('user', JSON.stringify(data));

            // Show success toast
            toast.success('Login successful!');

            // Navigate to home page
            navigate('/');
        } catch (error) {
            // Show error toast
            toast.error(`${error.response?.data?.message || 'An error occurred'}`);
        }
    };

    return (
        <main className='h-screen flex'>
            <section className='flex-1 bg-gray-200 flex items-center justify-center'>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '80%',
                        maxWidth: '600px',
                        padding: '40px',
                        gap: '10px'
                    }}
                >
                    <h2 className="text-3xl font-bold mb-4">Login</h2>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        InputProps={{
                            style: { backgroundColor: 'white', borderRadius: '15px' }
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        variant="outlined"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        InputProps={{
                            style: { backgroundColor: 'white', borderRadius: '15px' }
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            marginTop: '20px',
                            borderRadius: '15px'
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </section>
            <section className='flex-1 bg-red-100 hidden lg:block'>
                <img
                    src={Ecommerce}
                    alt="Error Loading"
                    className='h-full w-full object-cover'
                />
            </section>
        </main>
    );
};

export default Login;