package mp.picopicsapi.controller;

import mp.picopicsapi.model.Picture;
import mp.picopicsapi.model.User;
import mp.picopicsapi.service.PictureService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/pictures")
public class PictureController {
    private final PictureService pictureService;

    public PictureController(PictureService pictureService) {
        this.pictureService = pictureService;
    }

    @PostMapping
    public ResponseEntity<Picture> uploadPicture(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal User owner) throws IOException {
        return ResponseEntity.ok(pictureService.uploadPicture(file, owner));
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getPicture(
            @PathVariable long id,
            @AuthenticationPrincipal User owner) {
        return pictureService.getPicture(id, owner)
                .map(picture -> ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(picture.getContentType()))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + picture.getFilename() + "\"")
                        .body(picture.getData()))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Picture>> getUserPictures(@AuthenticationPrincipal User owner) {
        return ResponseEntity.ok(pictureService.getUserPictures(owner));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Picture> updatePicture(
            @PathVariable long id,
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal User owner) throws IOException {
        return ResponseEntity.ok(pictureService.updatePicture(id, file, owner));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePicture(
            @PathVariable long id,
            @AuthenticationPrincipal User owner) {
        pictureService.deletePicture(id, owner);
        return ResponseEntity.noContent().build();
    }
}
