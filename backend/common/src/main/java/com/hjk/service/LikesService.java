package com.hjk.service;

import com.hjk.exception.LikesException;
import com.hjk.exception.ProductException;
import com.hjk.exception.UserException;
import com.hjk.exception.common.CustomException;
import com.hjk.model.Likes;
import com.hjk.model.Product;
import com.hjk.model.User;
import com.hjk.model.dto.LikesDto;
import com.hjk.repository.LikesRepository;
import com.hjk.repository.ProductRepository;
import com.hjk.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikesService {

    private final LikesRepository likesRepository;

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    public Likes findLike(Long likeId) {
        return likesRepository.findById(likeId).orElseThrow(() -> new CustomException(LikesException.NOT_FOUND_LIKES));
    }
    public LikesDto.Response findById(Long likeId) {
        return findLike(likeId).toResponseDto();
    }

    public List<LikesDto.Response> findAllByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(UserException.NOT_FOUND_USER));
        return Likes.toResponseDtoList(likesRepository.findAllByUser(user));
    }
    public LikesDto.Response delete(Long likeId) {
        Likes likeToBeDeleted = findLike(likeId);
        Product product = productRepository.findById(likeToBeDeleted.getProduct().getId()).orElseThrow(() -> new CustomException(ProductException.NOT_FOUND_PRODUCT));
        product.likeDown();
        productRepository.save(product);
        likesRepository.deleteById(likeId);
        return likeToBeDeleted.toResponseDto();
    }
    public LikesDto.Response save(LikesDto.saveRequestDto request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new CustomException(UserException.NOT_FOUND_USER));
        Product product = productRepository.findById(request.getProductId()).orElseThrow(() -> new CustomException(ProductException.NOT_FOUND_PRODUCT));

        if(likesRepository.findByUserAndProduct(user, product).isPresent()) {
            throw new CustomException(LikesException.ALREADY_LIKE_PRODUCT);
        }

        product.likeUp();
        productRepository.save(product);
        Likes likeToBeSaved = Likes.builder().user(user).product(product).build();
        likesRepository.save(likeToBeSaved);
        return likeToBeSaved.toResponseDto();
    }
}
