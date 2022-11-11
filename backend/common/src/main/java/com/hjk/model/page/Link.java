package com.hjk.model.page;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Link {

    private String url;

    private String label;

    private Integer page;

    private Boolean active;
}

