package com.hjk.repository;


import com.hjk.model.Orders;
import com.hjk.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {

    List<Orders> findAllByUser(User user);
}
