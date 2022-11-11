package com.hjk.model.page;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
@Builder
public class Pagination {

    private Integer page;

    private Integer startPage;

    private Integer endPage;

    private Integer total;

    private Integer from;

    private Integer to;

    private List<Link> links = new ArrayList<>();

    public static <T> Pagination build(PageDto<T> response) {
        return Pagination.builder()
                .page(response.getPage())
                .startPage(response.getStartPage())
                .endPage(response.getEndPage())
                .total(response.getTotal())
                .from(response.getFrom())
                .to(response.getTo())
                .links(response.getLinks())
                .build();
    }
}

