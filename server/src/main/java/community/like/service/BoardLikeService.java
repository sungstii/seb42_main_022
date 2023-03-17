package community.like.service;

import community.board.entity.Board;
import community.like.entity.BoardLike;
import community.member.entity.Member;
import community.board.service.BoardService;
import community.like.repository.BoardLikeRepository;
import community.member.repository.MemberRepository;
import community.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardLikeService {
    private final BoardLikeRepository boardLikeRepository;
    private final BoardService boardService;
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    public Board boardLikeUP(long memberId, long boardId) {

        Member member = memberService.findMember(memberId);
        Board board = boardService.findBoard(boardId);

        BoardLike boardLike = boardLikeRepository.findByMemberAndBoard(member, board); // 추천수


        if (boardLike == null) {
            boardLike = new BoardLike();
            boardLike.setBoard(board);
            boardLike.setMember(member);
            boardLike.setBLikeStatus(true);
            board.setLikeCount(board.getLikeCount() + 1);
            member.setPoint(member.getPoint() + 50);// 포인트 적립 로직
        }

        else if (boardLike.getBLikeStatus()) {
            boardLike.setBLikeStatus(false);
            board.setLikeCount(board.getLikeCount() - 1);
            member.setPoint(member.getPoint() -50);// 포인트 적립 로직
        }

        else if (!boardLike.getBLikeStatus()) {
            boardLike.setBLikeStatus(true);
            board.setLikeCount(board.getLikeCount() + 1);
            member.setPoint(member.getPoint() + 50);// 포인트 적립 로직
        }
        boardLikeRepository.save(boardLike);
        memberRepository.save(member);

        return boardService.findBoard(boardId);
    }
}