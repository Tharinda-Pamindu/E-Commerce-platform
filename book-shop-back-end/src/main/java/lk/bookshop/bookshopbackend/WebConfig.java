package lk.bookshop.bookshopbackend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${user.upload.directory}")
    private String userUploadDirectory;

    @Value("${book.upload.directory}")
    private String bookUploadDirectory;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/upload/***")
                .addResourceLocations("file:" + userUploadDirectory + "/")
                .addResourceLocations("file:" + bookUploadDirectory + "/");
    }

}
