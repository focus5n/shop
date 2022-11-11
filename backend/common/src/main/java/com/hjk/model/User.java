package com.hjk.model;

import com.hjk.enums.UserRole;
import com.hjk.model.common.Base;
import com.hjk.model.dto.UserDto;
import com.hjk.utils.DateUtils;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Entity
@Table(name = "user")
@NoArgsConstructor
public class User extends Base {

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "money")
    private Integer money;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "basic_address")
    private String basicAddress;

    @Column(name = "detail_address")
    private String detailAddress;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Cart> carts;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Orders> orders;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review> reviews;

    public void encryptPassword(String password) {
        this.password = password;
    }

    public void updateAdmin() {
        this.role = UserRole.ADMIN;
    }

    public void moneyUp(Integer money) {
        this.money += money;
    }
    public void moneyMinus(Integer money) {
        this.money -= money;
    }

    public void addressUpdate(String basicAddress, String detailAddress) {
        this.basicAddress = basicAddress;
        this.detailAddress = detailAddress;
    }

    public void updateUser(UserDto.updateRequestDto request) {
        this.email = request.getEmail() == null ? this.email : request.getEmail();
        this.name = request.getName() == null ? this.name : request.getName();
        this.password = request.getPassword() == null ? this.password : request.getPassword();
        this.role = request.getRole() == null ? this.role : request.getRole();
        this.basicAddress = request.getBasicAddress() == null ? this.basicAddress : request.getBasicAddress();
        this.detailAddress = request.getDetailAddress() == null ? this.detailAddress : request.getDetailAddress();
    }

    @Builder
    public User(String email, String name, String password, UserRole role) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.role = UserRole.USER;
        this.money = 100000;
    }

    public UserDto.Response toResponseDto() {
        return UserDto.Response.builder().email(this.email)
                .id(this.id)
                .email(this.email)
                .name(this.name)
                .role(this.role)
                .money(this.money)
                .basicAddress(this.basicAddress)
                .detailAddress(this.detailAddress)
                .createAt(DateUtils.LocalDateFormat(this.createdAt))
                .build();
    }

    public static List<UserDto.Response> toResponseDtoList(List<User> users) {
        return users.stream().map(UserDto.Response::new).collect(Collectors.toList());
    }
}
