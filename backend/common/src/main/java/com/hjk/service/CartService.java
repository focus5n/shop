package com.hjk.service;

import com.hjk.exception.CartException;
import com.hjk.exception.ProductException;
import com.hjk.exception.UserException;
import com.hjk.exception.common.CustomException;
import com.hjk.model.Cart;
import com.hjk.model.Product;
import com.hjk.model.User;
import com.hjk.model.dto.CartDto;
import com.hjk.repository.CartRepository;
import com.hjk.repository.ProductRepository;
import com.hjk.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    public Cart findCart(Long id) {
        return cartRepository.findById(id).orElseThrow(() -> new CustomException(CartException.NOT_FOUND_CART));
    }

    public CartDto.Response findById(Long id) {
        return findCart(id).toResponseDto();
    }

    public List<CartDto.Response> findAllByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(UserException.NOT_FOUND_USER));
        return Cart.toResponseDtoList(cartRepository.findAllByUser(user));
    }

    public CartDto.Response save(CartDto.saveRequestDto request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new CustomException(UserException.NOT_FOUND_USER));
        Product product = productRepository.findById(request.getProductId()).orElseThrow(() -> new CustomException(ProductException.NOT_FOUND_PRODUCT));
        Cart cartToBeSaved = Cart.builder().productCount(request.getProductCount()).user(user).product(product).build();
        cartRepository.save(cartToBeSaved);
        return cartToBeSaved.toResponseDto();
    }

    public CartDto.Response delete(Long cartId) {
        Cart cartToBeDeleted = findCart(cartId);
        cartRepository.deleteById(cartId);
        return cartToBeDeleted.toResponseDto();
    }
}

