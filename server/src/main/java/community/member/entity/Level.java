package community.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Level {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long levelId;
    @Column(columnDefinition = "integer default 1", nullable = false)
    private int level; // 회원의 레벨
    @Column(columnDefinition = "integer default 0", nullable = false)
    private int levelExp; //다음 레벨까지의 경험치 퍼센트 / exp가 DB예약어라서 levelExp로 변경하였음
    @Column(columnDefinition = "integer default 0", nullable = false)
    private int totalExp; // 현재 경험치 총량
    @Column(columnDefinition = "integer default 100", nullable = false)
    private int requiredExp; // 레벨업까지 필요한 경험치 총량

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member; // 1:1 매핑

    public Level() { //레벨테이블 생성시 초기값 설정
        this.level = 1;
        this.requiredExp = 100;
    }
}