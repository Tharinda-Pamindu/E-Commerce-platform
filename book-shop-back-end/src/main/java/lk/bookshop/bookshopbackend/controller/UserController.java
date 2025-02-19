package lk.bookshop.bookshopbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import lk.bookshop.bookshopbackend.dto.UserProfileDto;
import lk.bookshop.bookshopbackend.entity.User;
import lk.bookshop.bookshopbackend.payloads.request.ForgotPs;
import lk.bookshop.bookshopbackend.service.UserService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "*")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping(value = "/user/{id}/profile")
    public ResponseEntity<?> updateProfileImage(@PathVariable Long id, @ModelAttribute UserProfileDto profileDto) {
        try {
            return ResponseEntity.ok().body(userService.updateUser(id, profileDto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping(value = "/user/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok().body(userService.getUserById(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping(value = "/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            return ResponseEntity.ok().body(userService.updateUserProfile(id, user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping(value = "/forgot/user")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPs user) {
        try {
            return ResponseEntity.ok().body(userService.forgotPassword(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
