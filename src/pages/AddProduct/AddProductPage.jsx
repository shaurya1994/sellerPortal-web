// import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import ImageUploader from '../../components/ImageUploader/ImageUploader';

export default function AddProductPage() {
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState('');

  const handleSubmit = () => {
    // later: create FormData and send to /seller/add-product API
    console.log('Ready to upload compressed images:', images);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <TextField 
        label="Product Name" 
        fullWidth 
        variant="outlined"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        sx={{ mb: 3 }}
      />
      <ImageUploader onImagesCompressed={setImages} />
      <Button 
        onClick={handleSubmit}
        variant="contained" 
        color="primary" 
        sx={{ mt: 3 }}
      >
        Submit Product
      </Button>
    </Box>
  );
}
