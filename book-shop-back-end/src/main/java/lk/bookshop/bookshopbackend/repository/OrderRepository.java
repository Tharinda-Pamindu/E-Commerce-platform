package lk.bookshop.bookshopbackend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import lk.bookshop.bookshopbackend.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.user.id=:userID")
    List<Order> findOrdersByUserId(@Param("userID") Long userID);
}
