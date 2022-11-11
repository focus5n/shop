package com.hjk.security.model;

import com.hjk.enums.UserRole;
import com.hjk.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

public class CustomSecurityUser extends org.springframework.security.core.userdetails.User {

    public CustomSecurityUser(@Valid User user) {
        super(user.getEmail(), user.getPassword(), makeGrantedAuthority(user.getRole()));
    }

    private static List<GrantedAuthority> makeGrantedAuthority(UserRole authorities) {
        List<GrantedAuthority> list = new ArrayList<>();
        list.add(new SimpleGrantedAuthority(authorities.getRole()));
        return list;
    }
}
