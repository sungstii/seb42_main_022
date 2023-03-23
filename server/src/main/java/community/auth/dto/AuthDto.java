package community.auth.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class AuthDto {

    @Getter
    static public class Login {
        @Email
        @NotBlank(message = "이메일을 확인해주세요")
        private String email;
        @NotBlank(message = "비밀번호를 확인해주세요")
        private String password;
    }

    @Getter
    static public class Logout {
        @NotBlank
        private String accessToken;

        @NotBlank
        private String refreshToken;
    }
}