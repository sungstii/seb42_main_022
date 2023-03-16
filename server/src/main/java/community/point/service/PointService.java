package community.point.service;

import community.board.entity.Board;
import community.board.repository.BoardRepository;
import community.like.entity.BoardLike;
import community.member.entity.Member;
import community.member.service.MemberService;
import community.point.entity.Point;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
@RequiredArgsConstructor
@Service
public class PointService {
    private final MemberService memberService;
    private final BoardRepository boardRepository;

    public Point memberPoint(long memberId) {
    return null;
    }
}
