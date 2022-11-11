package com.hjk.model.page;

import java.util.HashMap;
import java.util.List;

public class CommonPage<T> {

    private final List<T> data;

    private final HashMap<String, Pagination> payload = new HashMap<>();

    protected CommonPage(List<T> data, Pagination pagination) {
        this.data = data;
        this.payload.put("pagination", pagination);
    }

    public static <T> CommonPage<T> success(List<T> data, Pagination pagination) {
        return new CommonPage<T>(data, pagination);
    }

    public List<T> getData() {
        return data;
    }

    public HashMap<String, Pagination> getPayload() {
        return payload;
    }
}
