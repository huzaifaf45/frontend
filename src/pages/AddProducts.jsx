import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddProducts = () => {
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: ''
    });

    // Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle file input change
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setImages(prevImages => [...prevImages, ...files]);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, price, quantity } = formData;

        if (!name || !price || !quantity || images.length === 0) {
            toast.error('Please fill out all fields and upload at least one image.');
            return;
        }

        const form = new FormData();
        form.append('name', name);
        form.append('price', price);
        form.append('quantity', quantity);
        images.forEach(image => form.append('images', image));

        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token

        // console.log(user)

        try {
            await axios.post('http://localhost:5000/api/product/addproduct', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Product added successfully!');
            // Clear form
            setFormData({ name: '', price: '', quantity: '' });
            setImages([]);
        } catch (error) {
            toast.error('Failed to add product: ' + (error.response?.data?.message || 'An error occurred'));
        }
    };

    return (
        <main className='h-screen flex items-center justify-center bg-gray-100'>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '90%',
                    maxWidth: '700px',
                    padding: '40px',
                    gap: '20px',
                }}
            >
                <Typography variant="h4" component="h2" gutterBottom>
                    Add Product
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Name"
                            variant="outlined"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            InputProps={{
                                style: { backgroundColor: 'white', borderRadius: '15px' }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Price"
                            type="number"
                            variant="outlined"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            InputProps={{
                                style: { backgroundColor: 'white', borderRadius: '15px' }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Quantity"
                            type="number"
                            variant="outlined"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            InputProps={{
                                style: { backgroundColor: 'white', borderRadius: '15px' }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{ width: '100%', height: '40px', borderRadius: '15px' }}
                        >
                            Upload Images
                            <input
                                type="file"
                                multiple
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>
                    </Grid>
                </Grid>

                {images.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">Selected Images:</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px',
                            mt: 1
                        }}>
                            {images.map((file, index) => (
                                <Box
                                    key={index}
                                    component="img"
                                    src={URL.createObjectURL(file)}
                                    alt={`Selected image ${index}`}
                                    sx={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: '20px', borderRadius: '15px' }}
                >
                    Submit
                </Button>
            </Box>
        </main>
    );
};

export default AddProducts;
