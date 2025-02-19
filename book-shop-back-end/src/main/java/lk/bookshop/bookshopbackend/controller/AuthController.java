package lk.bookshop.bookshopbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import lk.bookshop.bookshopbackend.entity.User;
import lk.bookshop.bookshopbackend.payloads.request.LoginRequest;
import lk.bookshop.bookshopbackend.payloads.response.JwtResponse;
import lk.bookshop.bookshopbackend.payloads.response.MessageResponse;
import lk.bookshop.bookshopbackend.repository.UserRepository;
import lk.bookshop.bookshopbackend.security.jwt.JwtUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*")
@RestController
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping(value = "/auth/register")
    public ResponseEntity<?> UserRegister(@RequestBody User user) {

        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Username is already taken"));
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Email is already in use"));
        }

        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setRole(user.getRole());

        userRepository.save(newUser);

        return ResponseEntity.ok().body(new MessageResponse("User created successfully"));
    }

    @PostMapping(value = "/auth/login")
    public ResponseEntity<?> UserLogin(@RequestBody LoginRequest request) {

        if (request.getUsername() != null) {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(),
                            request.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtUtils.generateJwtToken(authentication);

            User user = userRepository.findByUsername(request.getUsername()).orElse(null);

            return ResponseEntity.ok().body(new JwtResponse(jwt, user.getId(), user.getUsername(), user.getEmail(),user.getRole()));
        }

        return ResponseEntity.badRequest().body(new MessageResponse("User login unsuccessfully"));

    }

}
