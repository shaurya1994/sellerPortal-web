import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { compressImage } from './compressImage';

export default function ImageUploader({ onImagesCompressed }) {
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const compressedFiles = [];

    for (const file of files) {
      const compressed = await compressImage(file);
      compressedFiles.push(compressed);
    }

    onImagesCompressed(compressedFiles);

    const previews = compressedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  return (
    <Box>
      <Typography variant="subtitle1">Upload Product Images (auto-compressed)</Typography>
      <Button
        variant="contained"
        component="label"
        sx={{ mt: 1, mb: 2 }}
      >
        Select Images
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={handleFileChange}
        />
      </Button>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {previewUrls.map((url, i) => (
          <img 
            key={i}
            src={url}
            alt="preview"
            width="120"
            height="120"
            style={{ objectFit: 'cover', borderRadius: '8px' }}
          />
        ))}
      </Box>
    </Box>
  );
}
