// FILE: src/utils/imageCompressor.js
import imageCompression from "browser-image-compression";

/**
 * Compress image files before upload
 * 
 * @param {File[]} files - Array of File objects (e.target.files)
 * @param {object} customOptions - Optional override settings
 * @returns {Promise<File[]>} Compressed image files
 */
export async function compressImages(files, customOptions = {}) {
  if (!files || !files.length) return [];

  const defaultOptions = {
    maxSizeMB: 0.3, // Target ~300 KB
    maxWidthOrHeight: 1280,
    useWebWorker: true,
    initialQuality: 0.8,
  };

  const options = { ...defaultOptions, ...customOptions };

  try {
    const compressed = await Promise.all(
      files.map(async (file) => {
        if (!file.type.startsWith("image/")) return null;

        // Perform compression
        const compressedFile = await imageCompression(file, {
          ...options,
          fileType: file.type,
        });

        // Debug log (only in dev mode)
        if (import.meta.env.MODE === "development") {
          console.log(
            `🗜️ Compressed "${file.name}": ${(file.size / 1024).toFixed(1)}KB → ${(compressedFile.size / 1024).toFixed(1)}KB`
          );
        }

        return compressedFile;
      })
    );

    return compressed.filter(Boolean);
  } catch (error) {
    console.error("❌ Image compression failed:", error);
    throw error;
  }
}
