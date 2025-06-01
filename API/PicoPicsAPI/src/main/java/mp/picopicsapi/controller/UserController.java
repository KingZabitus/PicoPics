package mp.picopicsapi.controller;


import mp.picopicsapi.model.User;
import mp.picopicsapi.service.UserSevice;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserSevice userService;

    public UserController(UserSevice userSevice) {
        this.userService = userSevice;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user){
        return ResponseEntity.ok(userService.createUser(user));
    }

    @GetMapping("/{username}")
    @PreAuthorize("#username == authentication.name or hasRole('ADMIN')")
    public ResponseEntity<User> getUser(@PathVariable String username){
        return userService.getUser(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/{username}")
    @PreAuthorize("#username == authentication.name or hasRole('ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable String username, @RequestBody User userDetails) {
        return ResponseEntity.ok(userService.updateUser(username, userDetails));
    }

    @DeleteMapping("/{username}")
    @PreAuthorize("#username == authentication.name or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        return ResponseEntity.noContent().build();
    }
}
