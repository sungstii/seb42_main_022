package community.member.repository;

import community.member.entity.Level;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LevelRepository extends JpaRepository<Level, Long> {
    Level findByMemberMemberId(long memberId); //Level테이블에서 파람값에 해당하는 Member테이블의 memberId를 가진 Level테이블만 찾아줘
}
