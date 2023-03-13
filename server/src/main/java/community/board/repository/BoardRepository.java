package community.board.repository;

import community.board.entity.Board;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    @Modifying
    @Query("update Board p set p.viewCount = p.viewCount + 1 where p.id = :id")
    int updateViewCount(Long id);
}
