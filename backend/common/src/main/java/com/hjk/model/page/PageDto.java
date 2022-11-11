package com.hjk.model.page;

import com.hjk.model.dto.ProductDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
public class PageDto<T> {

    private final static int PAGE_SIZE = 10;
    private int page;
    private int startPage;
    private int endPage;
    private int total;
    private int from;
    private int to;
    private List<T> contents;
    private List<Link> links;

    public static <G, T> PageDto<T> of(Page<G> entities, List<T> contents) {
        int currentPage = entities.getPageable().getPageNumber() + 1;
        int startPage = 1;
        int endPage = entities.getTotalPages();
        int total = entities.getContent().size();
        int from = currentPage % PAGE_SIZE == 0 ? PAGE_SIZE * (currentPage / PAGE_SIZE - 1) + 1
                : PAGE_SIZE * (currentPage / PAGE_SIZE) + 1;
        int to = Math.min(endPage, from + PAGE_SIZE - 1);
        List<Link> links = makeLinks(currentPage, from, to, endPage);

        return new PageDto<>(currentPage, startPage, endPage, total, from, to, contents, links);
    }

    public static List<Link> makeLinks(int currentPage, int from, int to, int endPage) {
        List<Link> links = new ArrayList<>();

        String prevLabel = "<<";
        boolean prevActive = from != 1;
        int prevPage = prevActive ? currentPage % PAGE_SIZE == 0 ? PAGE_SIZE * (currentPage / PAGE_SIZE - 1) + 1 - PAGE_SIZE : PAGE_SIZE * (currentPage / PAGE_SIZE) + 1 - PAGE_SIZE : -1;
        String prevUrl = prevActive ? "?page=" + prevPage : "";
        Link prevLink = Link.builder().page(prevPage).label(String.valueOf(prevLabel)).url(prevUrl).active(prevActive).build();
        links.add(prevLink);

        for (int start = from; start <= to; start += 1) {
            int page = start;
            String label = String.valueOf(start);
            String url = "?page=" + label;
            boolean active = start == currentPage;
            Link link = Link.builder().page(page).label(String.valueOf(start)).url(url).active(active).build();
            links.add(link);
        }

        String nextLabel = ">>";
        boolean nextActive = to != endPage;
        int nextPage = nextActive ? to + 1 : -1;
        String nextUrl = nextActive ? "?page=" + nextPage : "";
        Link nextLink = Link.builder().page(nextPage).label(String.valueOf(nextLabel)).url(nextUrl).active(nextActive).build();
        links.add(nextLink);

        return links;
    }

}