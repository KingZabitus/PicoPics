package mp.picopicsapi.service;

import mp.picopicsapi.model.Picture;
import mp.picopicsapi.model.User;
import mp.picopicsapi.repository.PictureRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class PictureService {
    private final PictureRepository pictureRepository;
    public PictureService(PictureRepository pictureRepository) {
        this.pictureRepository = pictureRepository;
    }

    public Picture uploadPicture(byte[] fileBytes, String filename, String contentType, User owner) {
        Picture picture = new Picture();

        picture.setFilename(filename);
        picture.setContentType(contentType != null ? contentType : "application/octet-stream");
        picture.setData(fileBytes);
        picture.setOwner(owner);

        return pictureRepository.save(picture);
    }

    public Optional<Picture> getPicture(long id, User owner){
        return pictureRepository.findByIdAndOwner(id, owner);
    }

    public List<Picture> getUserPictures(User owner) {
        return pictureRepository.findByOwner(owner);
    }

    public Picture updatePicture(long id, byte[] fileBytes, String filename, String contentType, User owner) {
        Picture picture = pictureRepository.findByIdAndOwner(id, owner)
                .orElseThrow(() -> new RuntimeException("Picture not found"));

        picture.setFilename(filename);
        picture.setContentType(contentType != null ? contentType : picture.getContentType());
        picture.setData(fileBytes);

        return pictureRepository.save(picture);
    }

    public void deletePicture(long id, User owner){
        Picture picture = pictureRepository.findByIdAndOwner(id, owner).orElseThrow(() -> new RuntimeException("Picture not found"));
        pictureRepository.delete(picture);
    }
}
