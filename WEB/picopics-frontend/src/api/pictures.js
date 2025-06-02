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

export const uploadPicture = async (file, fileName, contentType) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post('/api/picture', formData, {
            params: { filename, contentType },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error){
        console.error('Error uploading picture: ', error);
        throw error;
    }
};

export const getPictureById = async (id) => {
    try {
        const response = await api.get(`/api/pictures/${id}`, {
            responseType: 'blob',
        });
        return response.data;
    } catch(error) {
        console.error('Error fetching picture: ', error);
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