package lk.bookshop.bookshopbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.annotation.security.RolesAllowed;
import lk.bookshop.bookshopbackend.dto.BookProfileDto;
import lk.bookshop.bookshopbackend.entity.Book;
import lk.bookshop.bookshopbackend.service.BookService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "*")
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping(value = "/book")
    @RolesAllowed({ "ADMIN", "SELLER" })
    public ResponseEntity<?> saveBook(@RequestBody Book book) {
        try {
            return ResponseEntity.ok().body(bookService.saveBook(book));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping(value = "/book/{bookID}")
    public ResponseEntity<?> getBook(@PathVariable Long bookID) {
        try {
            return ResponseEntity.ok().body(bookService.findBookById(bookID));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping(value = "/auth/book")
    public ResponseEntity<?> getAllBooks() {
        try {
            return ResponseEntity.ok().body(bookService.getAllBooks());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping(value = "/book/{id}")
    @RolesAllowed({ "ADMIN", "SELLER" })
    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody Book book) {
        try {
            return ResponseEntity.ok().body(bookService.updateBook(id, book));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping(value = "/book/{bookID}")
    @RolesAllowed({ "ADMIN", "SELLER" })
    public ResponseEntity<?> deleteBookByBookList(@PathVariable Long bookID) {
        try {
            bookService.deleteBook(bookID);
            return ResponseEntity.ok().body(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping(value = "/book/{bookID}/profile")
    @RolesAllowed({ "ADMIN", "SELLER" })
    public ResponseEntity<?> updateAndAddCoverImage(@PathVariable Long bookID,
            @ModelAttribute BookProfileDto profileDto) {
        try {
            return ResponseEntity.ok().body(bookService.updateBookCover(bookID, profileDto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping(value = "/auth/{categoryID}")
    public ResponseEntity<?> getBooksByCategoryID(@PathVariable Long categoryID) {
        try {
            return ResponseEntity.ok().body(bookService.getAllBooksByCategoryId(categoryID));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
