package com.hjk.security.config;

import com.hjk.security.handler.*;
import com.hjk.security.service.CustomUserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomAuthenEntryPoint customAuthenEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;
    private final CustomLoginFailureHandler customLoginFailureHandler;
    private final CustomLoginSuccessHandler customLoginSuccessHandler;
    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;
    private final CustomUserDetailService customUserDetailService;
    private final PasswordEncoder passwordEncoder;
    private final SessionRegistry sessionRegistry;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/api/shop/user/admin").hasAnyAuthority("ADMIN")
                .anyRequest().permitAll()
                .and()
                .httpBasic()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(customAuthenEntryPoint)
                .accessDeniedHandler(customAccessDeniedHandler)
                .and()
                .formLogin()
                .loginPage("/login").permitAll()
                .loginProcessingUrl("/api/shop/user/login")
                .usernameParameter("email")
                .passwordParameter("password")
                .successHandler(customLoginSuccessHandler)
                .failureHandler(customLoginFailureHandler)
                .and()
                .logout()
                .logoutUrl("/api/shop/user/logout")
                .logoutSuccessHandler(customLogoutSuccessHandler)
                .deleteCookies("JSESSIONID")
                .invalidateHttpSession(true)
                .and()
                .csrf()
                .ignoringAntMatchers("/swagger-ui.html**")
                .and()
                .headers()
                .frameOptions()
                .disable()
                .and()
                .sessionManagement()
                .maximumSessions(1)
                .expiredUrl("/duplicated-login")
                .sessionRegistry(sessionRegistry);

        http.cors().and().csrf().disable(); //postman 403 방지
        //http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()); //Rest Api 접근 허용
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailService).passwordEncoder(passwordEncoder);
    }


}
