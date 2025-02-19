package lk.bookshop.bookshopbackend.service;

import java.util.List;
import org.springframework.stereotype.Service;

import lk.bookshop.bookshopbackend.dto.OrderStatusDto;
import lk.bookshop.bookshopbackend.entity.Order;

@Service
public interface OrderService {
    List<Order> getAllOrders();

    Order getOrderByOrderID(Long id);

    Order savOrder(Order order);

    Order updateOrder(Long orderID, OrderStatusDto orderStatus);

    void deleteOrder(Long orderID);

    List<Order> getAllOrdersByUserID(Long userID);
}
