package lk.bookshop.bookshopbackend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import lk.bookshop.bookshopbackend.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT b FROM Book b WHERE b.name=:book")
    Optional<Book> findByBookName(@Param("book") String book);

    @Query("SELECT b FROM Book b WHERE b.category.id =:categoryId")
    List<Book> findBookByCategoryId(@Param("categoryId") Long categoryId);
}
