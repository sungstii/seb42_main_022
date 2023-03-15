package community.board.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import community.comment.dto.CommentDto;
import community.member.dto.MemberDto;
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
        @Positive
        @NotNull
        private Long memberId;

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
    @NoArgsConstructor
    public static class Response {
        @JsonProperty("board_id")
        private Long boardId;
        private String title;
        private String contents;
        @JsonProperty("image_url")
        private String imageUrl;
        @JsonProperty("like_count")
        private int likeCount;
        @JsonProperty("view_count")
        private int viewCount;
        @JsonProperty("created_at")
        private LocalDateTime createdAt;
        @JsonProperty("modified_at")
        private LocalDateTime modifiedAt;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class TotalPageResponse {
        @JsonProperty("board_id")
        private Long boardId;
        private String title;
        private String contents;
        @JsonProperty("image_url")
        private String imageUrl;
        @JsonProperty("like_count")
        private int likeCount;
        @JsonProperty("view_count")
        private int viewCount;
        private MemberDto.Response member;    // member null 발생
        @JsonProperty("created_at")
        private LocalDateTime createdAt;
        @JsonProperty("modified_at")
        private LocalDateTime modifiedAt;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class DetailPageResponse {
        @JsonProperty("board_id")
        private Long boardId;
        private String title;
        private String contents;
        @JsonProperty("image_url")
        private String imageUrl;
        @JsonProperty("like_count")
        private int likeCount;
        @JsonProperty("view_count")
        private int viewCount;
        private MemberDto.Response member;
        @JsonProperty("created_at")
        private LocalDateTime createdAt;
        @JsonProperty("modified_at")
        private LocalDateTime modifiedAt;
        private List<CommentDto.InfoResponse> comments;
    }
}