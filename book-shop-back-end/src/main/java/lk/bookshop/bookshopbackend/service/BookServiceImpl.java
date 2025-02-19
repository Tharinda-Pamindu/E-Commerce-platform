package lk.bookshop.bookshopbackend.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import lk.bookshop.bookshopbackend.dto.BookProfileDto;
import lk.bookshop.bookshopbackend.entity.Book;
import lk.bookshop.bookshopbackend.repository.BookRepository;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Value("${book.upload.directory}")
    private String uploadDirectory;

    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book findBookById(Long id) {
        return bookRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Book not found"));
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book updateBook(Long id, Book book) {
        Book tempBook = bookRepository.findById(id).orElse(null);
        if (tempBook != null) {
            tempBook.setName(book.getName());
            tempBook.setDescription(book.getDescription());
            tempBook.setAuthor(book.getAuthor());
            tempBook.setQuantity(book.getQuantity());
            tempBook.setUnitPrice(book.getUnitPrice());
            tempBook.setCategory(book.getCategory());
            return bookRepository.save(tempBook);
        }
        return null;
    }

    @Override
    public void deleteBook(Long id) {
        if (bookRepository.findById(id).isPresent()) {
            bookRepository.deleteById(id);
        }
    }

    @Override
    public List<Book> getAllBooksByCategoryId(Long categoryId) {
        return bookRepository.findBookByCategoryId(categoryId);
    }

    @Override
    public Book updateBookCover(Long id, BookProfileDto profileDto) {
        Book book = bookRepository.findById(id).orElse(null);

        if (book != null) {
            MultipartFile file = profileDto.getCoverImage();
            String fileName = file.getOriginalFilename();
            String filePath = uploadDirectory + File.separator + fileName;

            try {
                file.transferTo(new File(filePath));
            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            book.setCoverImage(fileName);
            return bookRepository.save(book);

        }
        return null;
    }

}
