package com.hjk.repository;

import com.hjk.model.Likes;
import com.hjk.model.Product;
import com.hjk.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, Long> {

    Optional<Likes> findByUserAndProduct(User user, Product product);
    Optional<Likes> findByUser(User user);
    List<Likes> findAllByUser(User user);
}
