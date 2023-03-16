package community.point.entity;

import community.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@NoArgsConstructor
@Entity
@Table(name = "point")
public class Point {
    @Id
    private Long pointId;
    @Column(columnDefinition = "integer default 0", nullable = false) //null대신 0들어감
    private int mileage;
    @Column(columnDefinition = "integer default 0", nullable = false) //null대신 0들어감
    private int treeCount;
    @OneToOne
    @JoinColumn(name = "memberId")
    private Member member;
}
