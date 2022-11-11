package com.hjk.service;

import com.hjk.exception.ProductException;
import com.hjk.exception.common.CustomException;
import com.hjk.model.Product;
import com.hjk.model.dto.ProductDto;
import com.hjk.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product findProduct(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new CustomException(ProductException.NOT_FOUND_PRODUCT));
    }

    public ProductDto.Response findById(Long id) {
        return findProduct(id).toResponseDto();
    }

    public List<ProductDto.Response> findAll() {
        return Product.toResponseDtoList(productRepository.findAll());
    }

    public ProductDto.Response uploadProduct(ProductDto.uploadRequestDto request) {
        Product productToBeUploaded = request.toEntity();
        productRepository.save(productToBeUploaded);
        return productToBeUploaded.toResponseDto();
    }

    public ProductDto.Response updateProduct(Long id, ProductDto.updateRequestDto request) {
        Product productToBeUpdated = findProduct(id);
        productToBeUpdated.updateProduct(request);
        productRepository.save(productToBeUpdated);
        return productToBeUpdated.toResponseDto();
    }

    public ProductDto.Response deleteProduct(Long id) {
        Product productToBeDeleted = findProduct(id);
        productRepository.deleteById(id);
        return productToBeDeleted.toResponseDto();
    }


}
