package lk.bookshop.bookshopbackend.service;

import java.io.File;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import lk.bookshop.bookshopbackend.dto.UserProfileDto;
import lk.bookshop.bookshopbackend.entity.User;
import lk.bookshop.bookshopbackend.payloads.request.ForgotPs;
import lk.bookshop.bookshopbackend.payloads.response.MessageResponse;
import lk.bookshop.bookshopbackend.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Value("${user.upload.directory}")
    private String uploadDirectory;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
            return user;
        }

        return null;
    }

    @Override
    public User updateUser(Long id, UserProfileDto user) {
        User existsUser = userRepository.findById(id).orElse(null);

        if (existsUser != null) {
            MultipartFile file = user.getProfileImage();
            String fileName = file.getOriginalFilename();
            String filePath = uploadDirectory + File.separator + fileName;

            try {
                file.transferTo(new File(filePath));
            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            existsUser.setProfileImage(fileName);
            return userRepository.save(existsUser);
        }

        return null;

    }

    @Override
    public User updateUserProfile(Long id, User user) {
        User existUser = userRepository.findById(id).orElse(null);

        if (existUser != null) {
            existUser.setUsername(user.getUsername());
            existUser.setEmail(user.getEmail());
            existUser.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(existUser);
        }

        return null;
    }

    @Override
    public MessageResponse forgotPassword(ForgotPs forgotPs) {

        if (userRepository.existsByEmail(forgotPs.getEmail())
                && userRepository.existsByUsername(forgotPs.getUsername())) {

            User user = userRepository.findByUsername(forgotPs.getUsername()).orElse(null);
            User newUser = userRepository.findByEmail(forgotPs.getEmail()).orElse(null);

            if (user == newUser) {
                user.setPassword(passwordEncoder.encode(forgotPs.getPassword()));
                userRepository.save(user);
                return new MessageResponse("Password Changed");
            }
            return new MessageResponse("Username or Email is wrong");
        }

        return new MessageResponse("Username or Email is wrong");

    }

}
