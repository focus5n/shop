package com.hjk.repository;

import com.hjk.model.Cart;
import com.hjk.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUserId(Long userId);

    List<Cart> findAllByUser(User user);
}
