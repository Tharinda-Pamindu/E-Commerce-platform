package lk.bookshop.bookshopbackend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import lk.bookshop.bookshopbackend.entity.BookCategory;

@Service
public interface CategoryService {

    BookCategory saveCategory(BookCategory bookCategory);

    BookCategory findByCategoryID(Long id);

    List<BookCategory> getAllCategories();

    BookCategory updateCategory(Long id, BookCategory bookCategory);

    void deleteCategory(Long id);
}
