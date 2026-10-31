import { api } from "../lib/api";

/**
 * Uploads a photo or PDF to the website server (stored under /uploads/<folder>/).
 * Returns the file's URL, or null if the upload failed (the reason is logged).
 *
 *   const url = await uploadFile(input.files[0], "governance");
 */
export const uploadFile = async (file, folderName = "general") => {
  if (!file) return null;
  try {
    const { url } = await api.upload(file, folderName);
    return url;
  } catch (error) {
    console.error("File upload error:", error.message);
    window.alert?.(`Upload failed: ${error.message}`);
    return null;
  }
};
