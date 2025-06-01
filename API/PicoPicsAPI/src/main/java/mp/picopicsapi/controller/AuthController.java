package mp.picopicsapi.controller;

import mp.picopicsapi.service.AuthService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("authenticate")
    public String authenticate(@RequestParam String username, @RequestParam String password) {
        return authService.authenticate(username, password);
    }

}
