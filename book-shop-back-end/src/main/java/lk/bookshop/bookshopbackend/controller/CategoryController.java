package lk.bookshop.bookshopbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.annotation.security.RolesAllowed;
import lk.bookshop.bookshopbackend.entity.BookCategory;
import lk.bookshop.bookshopbackend.service.CategoryService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "*")
@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping(value = "/category")
    @RolesAllowed({ "ADMIN" })
    public ResponseEntity<?> saveCategory(@RequestBody BookCategory bookCategory) {
        try {
            return ResponseEntity.ok().body(categoryService.saveCategory(bookCategory));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping(value = "/category/{id}")
    public ResponseEntity<?> getCategory(@PathVariable Long id) {
        try {
            return ResponseEntity.ok().body(categoryService.findByCategoryID(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping(value = "/auth/category")
    public ResponseEntity<?> getAllCategory() {
        try {
            return ResponseEntity.ok().body(categoryService.getAllCategories());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping(value = "/category/{id}")
    @RolesAllowed({ "ADMIN" })
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody BookCategory category) {
        try {
            return ResponseEntity.ok().body(categoryService.updateCategory(id, category));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping(value = "/category/{id}")
    @RolesAllowed({ "ADMIN" })
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.ok().body(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
