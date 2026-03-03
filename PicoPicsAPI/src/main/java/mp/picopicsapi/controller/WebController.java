package mp.picopicsapi.controller;

import mp.picopicsapi.model.User;
import mp.picopicsapi.repository.UserRepository;
import mp.picopicsapi.service.PictureService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
public class WebController {

    private final PictureService pictureService;
    private final UserRepository userRepository;

    public WebController(PictureService pictureService, UserRepository userRepository) {
        this.pictureService = pictureService;
        this.userRepository = userRepository;
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model, Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName()).orElseThrow();
        model.addAttribute("pictures", pictureService.getUserPictures(user));
        model.addAttribute("username", user.getUsername());
        return "dashboard";
    }

    @PostMapping("/upload")
    public String upload(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) throws IOException {

        User user = userRepository.findByUsername(authentication.getName()).orElseThrow();

        pictureService.uploadPicture(
                file.getBytes(),
                file.getOriginalFilename(),
                file.getContentType(),
                user
        );

        return "redirect:/dashboard";
    }

    @PostMapping("/delete/{id}")
    public String delete(@PathVariable Long id, Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName()).orElseThrow();
        pictureService.deletePicture(id, user);
        return "redirect:/dashboard";
    }
}
