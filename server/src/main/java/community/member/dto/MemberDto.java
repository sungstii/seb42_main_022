package community.member.dto;

import community.member.entity.Member;
import lombok.*;

import javax.sound.midi.Patch;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;

public class MemberDto {
    @Getter
    @Setter
    @RequiredArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class Post{
        @NotBlank
        @Email
        private String email;

        @NotBlank(message = "이름은 공백이 들어갈수 없습니다.")
        private String name;

        private String phone;

        @NotBlank
        private String password;
    }
    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long memberId;

        private String name;

        private String phone;

        private Member.MemberStatus memberStatus;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }
        @AllArgsConstructor
        @Getter
        public static class Response{
            private long memberId;
            private String email;
            private String phone;
            private Member.MemberStatus memberStatus;
            private List<String> roles;

            public String getMemberStatus(){
                return memberStatus.getStatus();
            }
        }
    }

