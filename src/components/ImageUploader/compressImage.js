import imageCompression from 'browser-image-compression';

/**
 * Compress an image file before upload
 * @param {File} file - Original image file
 * @param {Object} [options]
 * @returns {Promise<File>} - Compressed image file
 */
export const compressImage = async (file, options = {}) => {
  const compressionOptions = {
    maxSizeMB: 1, // target size ~1MB
    maxWidthOrHeight: 1200,
    useWebWorker: true,
    ...options,
  };

  try {
    const compressedFile = await imageCompression(file, compressionOptions);
    console.log(
      `Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`,
      `→ Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
    );
    return compressedFile;
  } catch (err) {
    console.error('Image compression failed:', err);
    throw err;
  }
};
