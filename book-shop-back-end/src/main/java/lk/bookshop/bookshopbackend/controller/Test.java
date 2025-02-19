package lk.bookshop.bookshopbackend.controller;

import org.springframework.web.bind.annotation.RestController;
import jakarta.annotation.security.RolesAllowed;
import lk.bookshop.bookshopbackend.payloads.response.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class Test {

    @RolesAllowed({ "ADMIN", "USER" })
    @GetMapping(value = "/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok().body(new MessageResponse("Test for Authenticate Users"));
    }

}
