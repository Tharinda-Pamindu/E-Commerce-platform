package lk.bookshop.bookshopbackend.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lk.bookshop.bookshopbackend.dto.OrderStatusDto;
import lk.bookshop.bookshopbackend.entity.Book;
import lk.bookshop.bookshopbackend.entity.Order;
import lk.bookshop.bookshopbackend.repository.BookRepository;
import lk.bookshop.bookshopbackend.repository.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BookRepository bookRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderByOrderID(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Order not found"));
    }

    @Override
    public Order savOrder(Order order) {
        Set<Book> books = order.getBooks();
        for (Book book : books) {
            Book tempBook = bookRepository.findById(book.getId()).orElse(null);
            if (tempBook != null) {
                int qty = tempBook.getQuantity();
                tempBook.setQuantity(qty - 1);
                book.setQuantity(tempBook.getQuantity());
                bookRepository.save(tempBook);
            }

        }
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrder(Long orderID, OrderStatusDto order) {
        Order tempOrder = orderRepository.findById(orderID).orElse(null);
        if (tempOrder != null) {
            tempOrder.setStatus(order.getOrderStatus());
            return orderRepository.save(tempOrder);
        }
        return null;
    }

    @Override
    public void deleteOrder(Long orderID) {
        orderRepository.deleteById(orderID);
    }

    @Override
    public List<Order> getAllOrdersByUserID(Long userID) {
        return orderRepository.findOrdersByUserId(userID);
    }

}
