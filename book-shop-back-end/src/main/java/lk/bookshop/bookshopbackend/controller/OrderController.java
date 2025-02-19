package lk.bookshop.bookshopbackend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import lk.bookshop.bookshopbackend.dto.OrderStatusDto;
import lk.bookshop.bookshopbackend.entity.Order;
import lk.bookshop.bookshopbackend.service.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "*")
@RestController
public class OrderController {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping(value = "/order")
    public ResponseEntity<?> getAllOrders() {
        try {
            return ResponseEntity.ok().body(orderService.getAllOrders());
        } catch (Exception e) {
            LOGGER.error("Get all Order Error : {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping(value = "/order/{orderID}")
    public ResponseEntity<?> getOrderByOrderID(@PathVariable Long orderID) {
        try {
            return ResponseEntity.ok().body(orderService.getOrderByOrderID(orderID));
        } catch (Exception e) {
            LOGGER.error("Get Order By Id Error : {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping(value = "/order")
    public ResponseEntity<?> placeOrder(@RequestBody Order order) {
        try {
            return ResponseEntity.ok().body(orderService.savOrder(order));
        } catch (Exception e) {
            LOGGER.error("Place Order Error : {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping(value = "/order/{id}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestBody OrderStatusDto order) {
        try {
            return ResponseEntity.ok().body(orderService.updateOrder(id, order));
        } catch (Exception e) {
            LOGGER.error("Update Order Error : {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping(path = "/order/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        try {
            orderService.deleteOrder(id);
            return ResponseEntity.ok().body(null);
        } catch (Exception e) {
            LOGGER.error("Delete Order Error : {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping(value = "/order/{userID}/orders")
    public ResponseEntity<?> getAllOrdersByUser(@PathVariable Long userID) {
        try {
            return ResponseEntity.ok().body(orderService.getAllOrdersByUserID(userID));
        } catch (Exception e) {
            LOGGER.error("Get All Order by User Error : {}", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

}
