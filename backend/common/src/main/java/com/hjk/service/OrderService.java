package com.hjk.service;

import com.hjk.enums.OrderStatus;
import com.hjk.exception.OrderException;
import com.hjk.exception.ProductException;
import com.hjk.exception.UserException;
import com.hjk.exception.common.CustomException;
import com.hjk.model.Orders;
import com.hjk.model.Product;
import com.hjk.model.User;
import com.hjk.model.dto.OrderDto;
import com.hjk.repository.OrderRepository;
import com.hjk.repository.ProductRepository;
import com.hjk.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    public Orders findOrder(Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(() -> new CustomException(OrderException.NOT_FOUND_ORDER));
    }

    public OrderDto.Response findById(Long orderId) {
        return findOrder(orderId).toResponseDto();
    }

    public List<OrderDto.Response> findAllByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(UserException.NOT_FOUND_USER));
        return Orders.toResponseDtoList(orderRepository.findAllByUser(user));
    }

    @Transactional
    public OrderDto.Response create(OrderDto.createRequestDto request) {
        User requestUser = userRepository.findById(request.getUserId()).orElseThrow(() -> new CustomException(UserException.NOT_FOUND_USER));
        Product requestedProduct = productRepository.findById(request.getProductId()).orElseThrow(() -> new CustomException(ProductException.NOT_FOUND_PRODUCT));

        Integer totalPrice = request.getProductCount() * requestedProduct.getPrice();

        Orders requestedOrder = Orders.builder()
                .orderName(requestedProduct.getName())
                .productCount(request.getProductCount())
                .amount(totalPrice)
                .user(requestUser)
                .product(requestedProduct)
                .orderStatus(OrderStatus.PAYING)
                .build();

        orderRepository.save(requestedOrder);

        return requestedOrder.toResponseDto();
    }

    public OrderDto.Response updateInfo(Long orderId,OrderDto.updateRequestDto request) {
        Orders orderToBeUpdated = orderRepository.findById(orderId).orElseThrow(() -> new CustomException(OrderException.NOT_FOUND_ORDER));
        orderToBeUpdated.updateInfo(request);

        User userToBeUpdated = orderToBeUpdated.getUser();
        userToBeUpdated.addressUpdate(request.getBasicAddress(), request.getDetailAddress());
        userRepository.save(userToBeUpdated);

        orderRepository.save(orderToBeUpdated);
        return orderToBeUpdated.toResponseDto();
    }
    @Transactional
    public OrderDto.Response delete(Long orderId) {
        Orders orderToBeDeleted = findOrder(orderId);
        User user = orderToBeDeleted.getUser();
        Product product = orderToBeDeleted.getProduct();

        user.moneyUp(product.getPrice() * orderToBeDeleted.getProductCount());
        userRepository.save(user);

        product.stockUp();
        productRepository.save(product);

        orderRepository.deleteById(orderId);
        return orderToBeDeleted.toResponseDto();
    }

    @Transactional
    public OrderDto.Response refund(Long orderId) {
        Orders orderToBeRefund = findOrder(orderId);
        User user = orderToBeRefund.getUser();
        Product product = orderToBeRefund.getProduct();

        user.moneyUp(product.getPrice() * orderToBeRefund.getProductCount());
        userRepository.save(user);

        product.stockUp();
        productRepository.save(product);

        orderToBeRefund.refund();
        orderRepository.save(orderToBeRefund);

        return orderToBeRefund.toResponseDto();
    }

    public OrderDto.Response complete(Long orderId) {
        Orders orderToBeCompleted = findOrder(orderId);
        User userToBePaying = orderToBeCompleted.getUser();
        Product productToBeOrdered = orderToBeCompleted.getProduct();

        userToBePaying.moneyMinus(orderToBeCompleted.getAmount());
        userRepository.save(userToBePaying);

        productToBeOrdered.stockMinus();
        productRepository.save(productToBeOrdered);

        orderToBeCompleted.complete();
        orderRepository.save(orderToBeCompleted);
        return orderToBeCompleted.toResponseDto();
    }

}
