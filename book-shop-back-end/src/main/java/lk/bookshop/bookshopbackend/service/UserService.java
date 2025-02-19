package lk.bookshop.bookshopbackend.service;

import org.springframework.stereotype.Service;
import lk.bookshop.bookshopbackend.dto.UserProfileDto;
import lk.bookshop.bookshopbackend.entity.User;
import lk.bookshop.bookshopbackend.payloads.request.ForgotPs;
import lk.bookshop.bookshopbackend.payloads.response.MessageResponse;

@Service
public interface UserService {
    
    User getUserById(Long id);

    User updateUser(Long id, UserProfileDto user);

    User updateUserProfile(Long id, User user);

    MessageResponse forgotPassword(ForgotPs user);
}
