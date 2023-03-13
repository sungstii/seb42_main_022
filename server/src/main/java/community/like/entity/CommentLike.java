package community.like.entity;

import community.board.entity.Board;
import community.comment.entity.Comment;
import community.member.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
@Getter @Setter
@RequiredArgsConstructor
public class CommentLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentLikeId;

    @Enumerated(EnumType.STRING)
    private CommentLikeStatus commentLikeStatus;

    private boolean cLikeStatus;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;

    public boolean getCLikeStatus(){
        return cLikeStatus;
    }
    public enum CommentLikeStatus {
        UP,
        NONE,
        DOWN
    }
}
