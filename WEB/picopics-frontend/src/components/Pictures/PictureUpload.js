import { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { uploadPicture } from "../../api/pictures";

const PictureUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        if (!filename) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!file) return;
        try {
            await uploadPicture(file, filename, file.type);
            onUpload();
            setFile(null);
            setFileName('');
        } catch(error){
            console.error('Upload failed :', error);
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
        <Button variant="contained" component="span" sx={{ mr: 2 }}>
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
          />
          <Button type="submit" variant="contained" color="primary">
            Upload
          </Button>
        </>
      )}
    </Box>
    );
};

export default PictureUpload;