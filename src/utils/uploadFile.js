import { supabase } from '../supabaseClient'

/**
 * Uploads a file to Supabase Storage
 * 
 * @param {File} file - The file object to upload (from input element)
 * @param {string} folderName - The folder path in the bucket (e.g., 'profile-pictures', 'documents')
 * @returns {Promise<string|null>} - Public URL of the uploaded file or null if upload fails
 * 
 * Example usage:
 * const url = await uploadFile(fileInput.files[0], 'profile-pictures')
 * if (url) {
 *   console.log('File uploaded:', url)
 * }
 */
export const uploadFile = async (file, folderName) => {
  try {
    // Validate inputs
    if (!file) {
      throw new Error('No file provided')
    }
    if (!folderName) {
      throw new Error('Folder name is required')
    }

    // Create unique filename with timestamp to avoid conflicts
    // Format: folderName/timestamp-originalFilename
    const timestamp = Date.now()
    const fileName = `${timestamp}-${file.name}`
    const filePath = `${folderName}/${fileName}`

    // Upload file to 'uploads' bucket
    const { error } = await supabase.storage
      .from('uploads')
      .upload(filePath, file)

    // Handle upload errors
    if (error) {
      console.error('Upload error:', error.message)
      throw new Error(`Upload failed: ${error.message}`)
    }

    // Get public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath)

    // Return the public URL
    return publicUrlData.publicUrl
  } catch (error) {
    console.error('File upload error:', error.message)
    return null
  }
}
