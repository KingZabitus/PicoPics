import { useEffect, useState } from 'react';
import { getPictures, deletePicture } from '../../api/pictures';
import { 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Box, 
  Typography, 
  ListItemButton, 
  ListItemIcon 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import PictureView from './PictureView';

const PictureList = () => {
  const [pictures, setPictures] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const data = await getPictures();
        setPictures(data);
      } catch (error) {
        console.error('Error fetching pictures:', error);
      }
    };
    fetchPictures();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePicture(id);
      setPictures(pictures.filter(pic => pic.id !== id));
    } catch (error) {
      console.error('Error deleting picture:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        My Pictures
      </Typography>
      {pictures.length === 0 ? (
        <Typography>No pictures uploaded yet.</Typography>
      ) : (
        <>
          <List>
            {pictures.map((picture) => (
              <ListItem
                key={picture.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDelete(picture.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton onClick={() => setSelectedPicture(picture.id)}>
                  <ListItemIcon>
                    <ImageIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={picture.filename}
                    secondary={`Uploaded: ${new Date(picture.uploadDate).toLocaleString()}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
          {selectedPicture && (
            <PictureView
              pictureId={selectedPicture}
              open={!!selectedPicture}
              onClose={() => setSelectedPicture(null)}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default PictureList;