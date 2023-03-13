package community.like.service;

import community.board.entity.Board;
import community.like.entity.BoardLike;
import community.member.entity.Member;
import community.board.service.BoardService;
import community.like.repository.BoardLikeRepository;
import community.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class BoardLikeService {
    private final BoardLikeRepository boardLikeRepository;

    private final BoardService boardService;

    private final MemberService memberService;

    public Board boardLikeUP(long memberId, long boardId) {

        Member member = memberService.findMember(memberId);
        Board board = boardService.findBoardById(boardId);

        BoardLike boardLike = boardLikeRepository.findByMemberAndBoard(member, board);

        if (boardLike == null) {
            boardLike = new BoardLike();
            boardLike.setBoard(board);
            boardLike.setMember(member);
            boardLike.setBoardlikeStatus(BoardLike.BoardLikeStatus.UP);
            board.setLikeCount(board.getLikeCount() + 1);
        }
        else if (boardLike.getBoardlikeStatus() == BoardLike.BoardLikeStatus.DOWN) {
            boardLike.setBoardlikeStatus(BoardLike.BoardLikeStatus.UP);
            board.setLikeCount(board.getLikeCount() + 2);
        }
        else if (boardLike.getBoardlikeStatus() == BoardLike.BoardLikeStatus.UP) {
            boardLike.setBoardlikeStatus(BoardLike.BoardLikeStatus.NONE);
            board.setLikeCount(board.getLikeCount() - 1);
        }
        else if (boardLike.getBoardlikeStatus() == BoardLike.BoardLikeStatus.NONE) {
            boardLike.setBoardlikeStatus(BoardLike.BoardLikeStatus.UP);
            board.setLikeCount(board.getLikeCount() + 1);
        }

        boardLikeRepository.save(boardLike);
        return boardService.findBoardById(boardId);
    }
}