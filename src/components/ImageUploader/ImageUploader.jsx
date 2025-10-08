// src/components/ImageUploader/ImageUploader.jsx
import React, { useState, useRef } from "react";
import { Box, IconButton, Grid, Typography } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import compressImage from "./compressImage";

const MAX_FILES = 3;

const ImageUploader = ({ onChange, max = MAX_FILES, existing = [] }) => {
  const [files, setFiles] = useState(() =>
    existing.map((p) => ({ file: null, preview: p })) // existing may be URLs
  );
  const inputRef = useRef();

  const handleFiles = async (fileList) => {
    const arr = Array.from(fileList).slice(0, max - files.length);
    if (!arr.length) return;

    const processed = await Promise.all(
      arr.map(async (file) => {
        const compressed = await compressImage(file);
        const preview = URL.createObjectURL(compressed);
        return { file: compressed, preview };
      })
    );

    const next = [...files, ...processed];
    setFiles(next);
    onChange && onChange(next.map((f) => f.file).filter(Boolean)); // only Files
  };

  const onInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = null;
  };

  const removeAt = (index) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onChange && onChange(next.map((f) => f.file).filter(Boolean));
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <input
          ref={inputRef}
          accept="image/*"
          style={{ display: "none" }}
          id="image-uploader-input"
          type="file"
          multiple
          onChange={onInputChange}
        />
        <label htmlFor="image-uploader-input">
          <IconButton color="primary" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
        <Typography variant="body2">
          Upload images (max {max}). Current: {files.length}
        </Typography>
      </Box>

      <Grid container spacing={1}>
        {files.map((f, idx) => (
          <Grid item key={idx}>
            <Box
              sx={{
                width: 110,
                height: 110,
                borderRadius: 1,
                overflow: "hidden",
                position: "relative",
                border: "1px solid #e0e0e0",
              }}
            >
              <img
                src={f.preview}
                alt={`preview-${idx}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <IconButton
                onClick={() => removeAt(idx)}
                size="small"
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  bgcolor: "rgba(255,255,255,0.7)",
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageUploader;
