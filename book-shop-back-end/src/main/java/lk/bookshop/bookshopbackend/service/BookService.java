package lk.bookshop.bookshopbackend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import lk.bookshop.bookshopbackend.dto.BookProfileDto;
import lk.bookshop.bookshopbackend.entity.Book;

@Service
public interface BookService {
    Book saveBook(Book book);

    Book findBookById(Long id);

    List<Book> getAllBooks();

    Book updateBook(Long id, Book book);

    Book updateBookCover(Long id, BookProfileDto profileDto);

    void deleteBook(Long id);

    List<Book> getAllBooksByCategoryId(Long categoryId);
}
