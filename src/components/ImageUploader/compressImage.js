// src/components/ImageUploader/compressImage.js
import imageCompression from "browser-image-compression";

/**
 * Accepts a File and returns a compressed File (or original if compression not needed).
 */
export default async function compressImage(file) {
  try {
    const options = {
      maxSizeMB: 1, // target <= 1MB
      maxWidthOrHeight: 1600,
      useWebWorker: true,
    };
    const compressedBlob = await imageCompression(file, options);
    // If the library returns a File, it may already be a File; ensure it's a File:
    const compressedFile =
      compressedBlob instanceof File
        ? compressedBlob
        : new File([compressedBlob], file.name, { type: compressedBlob.type });
    return compressedFile;
  } catch (err) {
    console.warn("Image compression failed, using original file.", err);
    return file;
  }
}

// import imageCompression from 'browser-image-compression';

// /**
//  * Compress an image file before upload
//  * @param {File} file - Original image file
//  * @param {Object} [options]
//  * @returns {Promise<File>} - Compressed image file
//  */
// export const compressImage = async (file, options = {}) => {
//   const compressionOptions = {
//     maxSizeMB: 1, // target size ~1MB
//     maxWidthOrHeight: 1200,
//     useWebWorker: true,
//     ...options,
//   };

//   try {
//     const compressedFile = await imageCompression(file, compressionOptions);
//     console.log(
//       `Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`,
//       `→ Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
//     );
//     return compressedFile;
//   } catch (err) {
//     console.error('Image compression failed:', err);
//     throw err;
//   }
// };
