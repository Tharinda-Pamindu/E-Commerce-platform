package lk.bookshop.bookshopbackend.dto;

import org.springframework.web.multipart.MultipartFile;
import lombok.Data;

@Data
public class UserProfileDto {
    private MultipartFile profileImage;
}
