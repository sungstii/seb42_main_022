package community.comment.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import community.board.entity.Board;
import community.member.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @Setter
@RequiredArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    
    @Column(nullable = false, length = 99999)
    private String contents;
    @Column(nullable = false)
    private int likeCount;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime modifiedAt;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;
    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

}
