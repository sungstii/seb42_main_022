package community.board.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import community.comment.entity.Comment;
import community.member.entity.Member;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@EntityListeners(AuditingEntityListener.class)
@RequiredArgsConstructor
@ToString
@Table(name = "boards")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String contents;

    @Column(nullable = false)
    private int likeCount;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private int viewCount;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;

    @OneToMany(mappedBy = "board")
    private List<Comment> commentList = new ArrayList<>();

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime modifiedAt;




//    @Builder
//    public Board(String title, String contents,Long viewCount) {
//        this.title = title;
//        this.contents = contents;
//        this.viewCount = viewCount;
//    }
//
//    public void updateVisit(Long viewCount){
//        this.viewCount = viewCount;
//    }
}
