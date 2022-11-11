package com.hjk.service.search;

import com.hjk.enums.OrderStatus;
import com.hjk.model.Orders;
import com.hjk.model.QOrders;
import com.hjk.model.dto.OrderDto;
import com.hjk.model.page.PageDto;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class OrderSearchService extends QuerydslRepositorySupport {

    public OrderSearchService() {
        super(Orders.class);
    }


    public PageDto<OrderDto.Response> search(Long id, Pageable pageable) {
        QOrders order = QOrders.orders;
        JPQLQuery<Orders> query = from(order).
                where(order.user.id.eq(id).and(order.orderStatus.eq(OrderStatus.COMPLETE)))
                .fetchAll();


        List<Orders> orders = Objects.requireNonNull(this.getQuerydsl()).applyPagination(pageable, query).fetch();
        Page<Orders> pageDto = new PageImpl<>(orders, pageable, query.fetchCount());

        return PageDto.of(pageDto, Orders.toResponseDtoList(orders));
    }
}
