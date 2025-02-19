package lk.bookshop.bookshopbackend.payloads.request;

import lombok.Data;

@Data
public class ForgotPs {
    private String username;
    private String email;
    private String password;
}
