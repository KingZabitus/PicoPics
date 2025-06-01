package mp.picopicsapi.repository;

import mp.picopicsapi.model.Picture;
import mp.picopicsapi.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface PictureRepository extends CrudRepository<Picture, Long> {
    List<Picture> findByOwner(User owner);
    Optional<Picture> findByIdAndOwner(long id, User owner);
}
