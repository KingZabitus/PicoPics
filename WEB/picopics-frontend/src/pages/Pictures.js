import { Container } from '@mui/material';
import PictureUpload from '../components/Pictures/PictureUpload';
import PictureList from '../components/Pictures/PictureList';

const PicturesPage = () => {
  const [refresh, setRefresh] = useState(false);

  const handleUpload = () => {
    setRefresh(!refresh);
  };

  return (
    <Container maxWidth="md">
      <PictureUpload onUpload={handleUpload} />
      <PictureList />
    </Container>
  );
};

export default PicturesPage;