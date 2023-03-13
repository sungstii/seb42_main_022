package community.board.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class BoardDto {

    @Getter
    @RequiredArgsConstructor
    @ToString
    public static class Post {
        @NotBlank(message = "제목을 작성해주세요")
        @Size(max = 100, message = "100자 이내로 작성해 주세요.")
        private String title;

        @NotBlank(message = "내용은 공백이 아니어야 합니다.")
        private String contents;
    }

    @Getter
    @RequiredArgsConstructor
    @Setter
    @ToString
    public static class Patch {
        private Long questionId;

        @NotBlank(message = "제목을 작성해주세요")
        private String title;

        @Size(max = 5000, message = "5000자 이내로 작성해주세요.")
        @NotBlank(message = "내용은 공백이 아니어야 합니다.")
        private String contents;
    }

    @Getter
    @Setter
    @RequiredArgsConstructor
    @ToString
    public static class Response {
        private Long boardId;
        private String title;
        private String contents;
        private int likeCount;
        private int viewCount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}