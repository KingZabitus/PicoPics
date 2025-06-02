import { useEffect, useState } from 'react';
import { getPictureById } from '../../api/pictures';
import { Box, Modal, CircularProgress } from '@mui/material';

const PictureView = ({ pictureId, open, onClose }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!pictureId || !open) return;

    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const imageData = await getPictureById(pictureId);
        
        // Converter o array de bytes para Blob e criar URL
        const blob = new Blob([new Uint8Array(imageData)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading image:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [pictureId, open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 'none',
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          imageUrl && <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
        )}
      </Box>
    </Modal>
  );
};

export default PictureView;