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
