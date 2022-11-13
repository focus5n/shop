package com.hjk.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hjk.model.common.CommonResult;
import com.hjk.model.dto.UserDto;
import com.hjk.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final UserService userService;
    private final RequestCache requestCache = new HttpSessionRequestCache();
    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws ServletException, IOException {
        HttpSession session = request.getSession();

        if (authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ADMIN") || authority.getAuthority().equals("USER"))) {
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Cache-Control", "no-cache");
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            UserDto.Response user = userService.findUser(authentication.getName()).toResponseDto();
            response.getWriter().write(objectMapper.writeValueAsString(CommonResult.success(user, "로그인에 성공 하였습니다")));
            response.getWriter().flush();
            return;
        }

        if(session != null) {
            resultRedirectStrategy(request, response, authentication);
        } else {
            super.onAuthenticationSuccess(request, response, authentication);
        }
    }

    protected void resultRedirectStrategy(HttpServletRequest request, HttpServletResponse response,
                                          Authentication authentication) throws ServletException, IOException {
        SavedRequest savedRequest = requestCache.getRequest(request, response);

        if (savedRequest != null) {
            String redirectUrl = savedRequest.getRedirectUrl();
            redirectStrategy.sendRedirect(request, response, redirectUrl);
        } else {
            redirectStrategy.sendRedirect(request, response, "/");
        }
    }
}