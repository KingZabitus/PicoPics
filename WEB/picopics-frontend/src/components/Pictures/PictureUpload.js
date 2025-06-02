import { useState } from 'react';
import { Button, Box, TextField, CircularProgress } from '@mui/material';
import { uploadPicture } from '../../api/pictures';

const PictureUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (!filename) {
      setFilename(selectedFile.name);
    }
  };

  const fileToByteArray = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const byteArray = new Uint8Array(arrayBuffer);
        resolve(Array.from(byteArray));
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      reader.readAsArrayBuffer(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    
    setIsLoading(true);
    
    try {
      
      const fileBytes = await fileToByteArray(file);
      await uploadPicture(fileBytes, filename, file.type);
      
      onUpload();
      setFile(null);
      setFilename('');
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="upload-button"
      />
      <label htmlFor="upload-button">
        <Button variant="contained" component="span" sx={{ mr: 2 }} disabled={isLoading}>
          Choose File
        </Button>
      </label>
      {file && (
        <>
          <TextField
            label="Filename"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            sx={{ mr: 2 }}
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default PictureUpload;