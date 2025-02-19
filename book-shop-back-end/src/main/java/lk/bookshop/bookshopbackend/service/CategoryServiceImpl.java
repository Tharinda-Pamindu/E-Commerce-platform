package lk.bookshop.bookshopbackend.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lk.bookshop.bookshopbackend.entity.BookCategory;
import lk.bookshop.bookshopbackend.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public BookCategory saveCategory(BookCategory bookCategory) {
        return categoryRepository.save(bookCategory);
    }

    @Override
    public BookCategory findByCategoryID(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Category not found"));
    }

    @Override
    public List<BookCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public BookCategory updateCategory(Long id, BookCategory bookCategory) {
        BookCategory category = categoryRepository.findById(id).orElse(null);
        category.setTitle(bookCategory.getTitle());
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

}
