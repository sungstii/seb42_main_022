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

        Member member = memberService.findMember(memberId); // 좋아요 누르는 회원
        Board board = boardService.findBoard(boardId); // 좋아요가 눌리는 게시판
        Member boardMember = memberService.findMember(board.getMember().getMemberId()); // 게시판 작성자

        BoardLike boardLike = boardLikeRepository.findByMemberAndBoard(member, board); // 추천수


        if (boardLike == null) {
            boardLike = new BoardLike();
            boardLike.setBoard(board);
            boardLike.setMember(member);
            boardLike.setBLikeStatus(true);
            board.setLikeCount(board.getLikeCount() + 1);
            boardMember.setPoint(boardMember.getPoint() + 50);// 포인트 적립 로직
        } else if (boardLike.getBLikeStatus()) {
            boardLike.setBLikeStatus(false);
            board.setLikeCount(board.getLikeCount() - 1);
            boardMember.setPoint(boardMember.getPoint() - 50);// 포인트 적립 로직
        } else if (!boardLike.getBLikeStatus()) {
            boardLike.setBLikeStatus(true);
            board.setLikeCount(board.getLikeCount() + 1);
            boardMember.setPoint(boardMember.getPoint() + 50);// 포인트 적립 로직
        }
        boardLikeRepository.save(boardLike);
        memberRepository.save(member);
        memberRepository.save(boardMember);

        return boardService.findBoard(boardId);
    }

    /*해당 회원에 대한 해당게시판 좋아요 여부 세팅하기*/
    public void BoardLikeStatus(long memberId, Board board) {
        Member member = memberService.findMember(memberId); //멤버 정보찾기
        
        BoardLike boardLike = boardLikeRepository.findByMemberAndBoard(member, board);
        
        if (boardLike == null) { //좋아요를 누르지 않은 상태라면 테이블 생성해주고 상태 세팅
            boardLike = new BoardLike();
            boardLike.setBLikeStatus(false);
            boardLikeRepository.save(boardLike);
            member.setLikeStatus("FALSE");
        } else if (boardLike.getBLikeStatus() == true) { //좋아요를 누른 상태라면 좋아요상태 TRUE
            member.setLikeStatus("TURE");
        }else member.setLikeStatus("FALSE"); // 좋아요를 취소한 상태라면 FALSE
    }
}