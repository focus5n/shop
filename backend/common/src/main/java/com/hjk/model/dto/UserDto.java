package com.hjk.model.dto;

import com.hjk.enums.UserRole;
import com.hjk.model.User;
import com.hjk.utils.DateUtils;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class UserDto {

    @Getter
    @NoArgsConstructor
    public static class loginRequestDto {
        @NotBlank(message = "이메일을 입력 해주세요")
        private String email;

        @NotBlank(message = "비밀번호를 입력 해주세요")
        private String password;
    }

    @Getter
    @NoArgsConstructor
    public static class registerRequestDto {
        @NotBlank(message = "이메일을 입력 해주세요")
        @Email(message = "이메일 양식을 지켜 주세요")
        private String email;

        @NotBlank(message = "비밀번호를 입력해주세요")
        @Pattern(regexp = "^(?=.*[a-zA-Z0-9`~!@#$%^&*()\\-_+=\\\\]).{8,15}$", message = "비밀번호는 영문/숫자/특수문자 조합 8자리~15자리 입니다")
        private String password;

        @NotBlank(message = "닉네임을 입력해주세요")
        @Size(max = 10, message = "닉네임 10자 내외로 작성해주세요.")
        private String name;

        private UserRole role;

        public User toEntity() {
            return User.builder()
                    .email(this.email)
                    .password(this.password)
                    .name(this.name)
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    public static class updateRequestDto {

        private String email;

        private String name;

        private String password;

        private UserRole role;

        private String basicAddress;

        private String detailAddress;
    }

    @Getter
    @NoArgsConstructor
    public static class Response {
        private Long id;
        private String email;
        private String name;
        private Integer money;
        private UserRole role;
        private String createAt;
        private String basicAddress;
        private String detailAddress;

        public Response(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.name = user.getName();
            this.role = user.getRole();
            this.money = user.getMoney();
            this.createAt = DateUtils.LocalDateFormat(user.getCreatedAt());
            this.basicAddress = user.getBasicAddress();
            this.detailAddress = user.getDetailAddress();
        }

        @Builder
        public Response(Long id, String email, String name,Integer money, UserRole role, String createAt, String basicAddress, String detailAddress) {
            this.id = id;
            this.email = email;
            this.name = name;
            this.money = money;
            this.basicAddress = basicAddress;
            this.detailAddress = detailAddress;
            this.role = role;
            this.createAt = createAt;
        }
    }

}
