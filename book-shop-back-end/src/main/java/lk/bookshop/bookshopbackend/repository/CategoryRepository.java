package lk.bookshop.bookshopbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import lk.bookshop.bookshopbackend.entity.BookCategory;

public interface CategoryRepository extends JpaRepository<BookCategory, Long> {

}
