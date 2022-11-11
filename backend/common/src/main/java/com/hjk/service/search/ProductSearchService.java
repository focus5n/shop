package com.hjk.service.search;

import com.hjk.model.Product;
import com.hjk.model.QProduct;
import com.hjk.model.dto.ProductDto;
import com.hjk.model.page.PageDto;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
public class ProductSearchService extends QuerydslRepositorySupport {

    public ProductSearchService() {
        super(Product.class);
    }

    public PageDto<ProductDto.Response> pageSearchList(String search, Pageable pageable) {
        QProduct product = QProduct.product;
        JPQLQuery<Product> query = search == null ?
                from(product).fetchAll() :
                from(product).where(product.name.likeIgnoreCase("%"+ search + "%"))
                .fetchAll();

        List<Product> products = Objects.requireNonNull(this.getQuerydsl()).applyPagination(pageable, query).fetch();
        Page<Product> pageDto = new PageImpl<>(products, pageable, query.fetchCount());

        return PageDto.of(pageDto, Product.toResponseDtoList(products));
    }

    public PageDto<ProductDto.Response> categorySearch(String mainCategory, String subCategory, Pageable pageable) {
         QProduct product = QProduct.product;
        JPQLQuery<Product> query = from(product)
                    .where(product.mainCategory.likeIgnoreCase(mainCategory + "%")
                            .and(product.subCategory.likeIgnoreCase(subCategory + "%")))
                    .fetchAll();


        List<Product> products = Objects.requireNonNull(this.getQuerydsl()).applyPagination(pageable, query).fetch();
        Page<Product> pageDto = new PageImpl<>(products, pageable, query.fetchCount());

        return PageDto.of(pageDto, Product.toResponseDtoList(products));
    }

    public ProductDto.Response bestProduct() {
        QProduct product = QProduct.product;
        return from(product).orderBy(product.likeCount.desc())
                .limit(1).fetchOne().toResponseDto();
    }
}
