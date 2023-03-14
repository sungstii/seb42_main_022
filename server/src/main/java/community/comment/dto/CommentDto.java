package community.comment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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
        @JsonProperty("comment_id")
        private Long commentId;
        private String contents;
        @JsonProperty("like_count")
        private int likeCount;
        @JsonProperty("create_at")
        private LocalDateTime createdAt;
        @JsonProperty("modified_at")
        private LocalDateTime modifiedAt;
        @JsonProperty("board_id")
        private long boardId;
        @JsonProperty("member_id")
        private long memberId;
    }
}