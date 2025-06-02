import api from './auth';

export const getPictures = async () => {
    try {
        const response = await api.get('/api/pictures');
        return response.data;
    } catch (error) {
        console.error('Error fetching pictures: ', error);
        throw error;
    }
};

export const uploadPicture = async (fileBytes, filename, contentType) => {
  try {
    const response = await api.post('/api/pictures', fileBytes, {
      params: { 
        filename, 
        contentType: contentType || 'application/octet-stream' 
      },
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading picture:', error);
    throw error;
  }
};

export const getPictureById = async (id) => {
  try {
    const response = await api.get(`/api/pictures/${id}`, {
      responseType: 'arraybuffer', 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching picture:', error);
    throw error;
  }
};

export const deletePicture = async(id) => {
    try {
        await api.delete(`/api/pictures/${id}`)
    } catch (error) {
        console.error('Error deleting picture: ', error);
        throw error;
    }
}