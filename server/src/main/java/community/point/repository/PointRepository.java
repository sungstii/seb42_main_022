package community.point.repository;

import community.member.entity.Member;
import community.point.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointRepository extends JpaRepository<Point, Long> {
    Point findByMemberMemberId(long memberId);
}
