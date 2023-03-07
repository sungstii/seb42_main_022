package community.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {
    @Setter @Getter
    @AllArgsConstructor
    public static class Post {
        private Long commentId;
        private Long memberId;
        @NotBlank(message = "내용을 입력해주세요.")
        private String contents;
    }

    @Setter @Getter
    @AllArgsConstructor
    public static class Patch {
        private Long commentId;

        @NotBlank(message = "내용을 입력해주세요.")
        private String contents;
    }

    @Setter @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private Long commentId;
        private String contents;
        private int likeCount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private long boardId;
        private long memberId;
    }
}