package com.hjk.security.service;

import com.hjk.exception.UserException;
import com.hjk.exception.common.CustomException;
import com.hjk.model.User;
import com.hjk.repository.UserRepository;
import com.hjk.security.model.CustomSecurityUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
         User user =  userRepository.findByEmail(email).orElseThrow(() -> new CustomException(UserException.NOT_FOUND_USER));


        if (Objects.nonNull(RequestContextHolder.getRequestAttributes())) {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                    .getRequest();
            request.getSession().setAttribute("user", user);
        }
        return new CustomSecurityUser(user);
    }
}
