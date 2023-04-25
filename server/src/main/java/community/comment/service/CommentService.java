package community.comment.service;

import community.comment.entity.Comment;
import community.comment.repository.CommentRepository;
import community.exception.BusinessLogicException;
import community.exception.ExceptionCode;
import community.member.entity.Member;
import community.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberService memberService;

    public Comment createComment(Comment comment) {
        Comment createComment = commentRepository.save(comment);

        Member member = memberService.findMember(createComment.getMember().getMemberId()); //생성된 댓글을 작성한 회원을 찾는다
        member.setCommentCount(member.getCommentCount() + 1); //해당 회원에 대한 댓글 작성 카운트 1 증가

        creatorLevelUpdate(); // 작성자의 레벨정보들 업데이트

        return createComment;
    }

    public Comment updateComment(Comment comment) {

        Comment findComment = findByComment(comment.getCommentId());

        Optional.ofNullable(comment.getContents())
                .ifPresent(contents -> findComment.setContents(contents));

        return commentRepository.save(findComment);
    }

    public Comment findComment(long commentId) {
        return findByComment(commentId);
    }

    public void deleteComment(long commentId) {
//        Comment comment = findComment(commentId);

        commentRepository.deleteById(commentId);
//레벨이 줄어들지 않게 해달라는 요청을 받음
//        Member member = memberService.findMember(comment.getMember().getMemberId()); //생성된 댓글을 작성한 회원을 찾는다
//        member.setCommentCount(member.getCommentCount() - 1); //해당 회원에 대한 댓글 작성 카운트 1 감소
    }

    public Page<Comment> findComments(int page, int size) {
        Page<Comment> findBoard = commentRepository.findAll(PageRequest.of(page, size, Sort.by("boardId").descending()));

        return findBoard;
    }

    public Comment findByComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }
    
    /*작성자들의 레벨정보 업데이트*/
    public void creatorLevelUpdate() {
        //todo: 없에야함 다른방법으로
        List<Comment> comments = commentRepository.findAll();
        for(Comment comment : comments){
            comment.setCreatorLevel(comment.getMember().getLevel().getLevel());
        }
    }
}
