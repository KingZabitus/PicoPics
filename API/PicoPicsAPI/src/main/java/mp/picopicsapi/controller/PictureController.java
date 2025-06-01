package mp.picopicsapi.controller;

import io.swagger.v3.oas.annotations.Operation;
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

    @Operation(summary = "Upload de imagem", description = "Envie os bytes da imagem")
    @PostMapping
    public ResponseEntity<Picture> uploadPicture(
            @RequestBody byte[] fileBytes,
            @RequestParam String filename,
            @RequestParam(required = false) String contentType,
            @AuthenticationPrincipal User owner) {
        return ResponseEntity.ok(pictureService.uploadPicture(fileBytes, filename, contentType, owner));
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
        List<Picture> pictures = pictureService.getUserPictures(owner);
        pictures.sort((p1, p2) -> p2.getUploadDate().compareTo(p1.getUploadDate()));
        return ResponseEntity.ok(pictures);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Picture> updatePicture(
            @PathVariable long id,
            @RequestBody byte[] fileBytes,
            @RequestParam String filename,
            @RequestParam(required = false) String contentType,
            @AuthenticationPrincipal User owner) {
        return ResponseEntity.ok(pictureService.updatePicture(id, fileBytes, filename, contentType, owner));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePicture(
            @PathVariable long id,
            @AuthenticationPrincipal User owner) {
        pictureService.deletePicture(id, owner);
        return ResponseEntity.noContent().build();
    }
}
