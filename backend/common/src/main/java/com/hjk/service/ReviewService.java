package com.hjk.service;

import com.hjk.exception.ProductException;
import com.hjk.exception.ReviewException;
import com.hjk.exception.UserException;
import com.hjk.exception.common.CustomException;
import com.hjk.model.Product;
import com.hjk.model.Review;
import com.hjk.model.User;
import com.hjk.model.dto.ReviewDto;
import com.hjk.repository.ProductRepository;
import com.hjk.repository.ReviewRepository;
import com.hjk.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    public List<ReviewDto.Response> findByProduct(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new CustomException(ProductException.NOT_FOUND_PRODUCT));
        List<Review> reviews = reviewRepository.findAllByProduct(product);
        return Review.toResponseDtoList(reviews);
    }

    public ReviewDto.Response save(ReviewDto.saveRequestDto request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new CustomException(UserException.NOT_FOUND_USER));
        Product product = productRepository.findById(request.getProductId()).orElseThrow(() -> new CustomException(ProductException.NOT_FOUND_PRODUCT));
        Review review = Review.builder().comment(request.getComment()).user(user).product(product).build();
        reviewRepository.save(review);
        return review.toResponseDto();
    }

    public ReviewDto.Response delete(Long reviewId) {
        Review reviewToBeDeleted = reviewRepository.findById(reviewId).orElseThrow(() -> new CustomException(ReviewException.NOT_FOUND_REVIEW));
        reviewRepository.delete(reviewToBeDeleted);
        return reviewToBeDeleted.toResponseDto();
    }
}
