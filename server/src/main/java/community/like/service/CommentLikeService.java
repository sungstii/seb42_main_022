package community.like.service;

import community.comment.entity.Comment;
import community.comment.service.CommentService;
import community.like.entity.CommentLike;
import community.like.repository.CommentLikeRepository;
import community.member.entity.Member;
import community.member.repository.MemberRepository;
import community.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CommentLikeService {

    private final CommentService commentService;
    private final MemberService memberService;
    private final CommentLikeRepository commentLikeRepository;
    private final MemberRepository memberRepository;


    public Comment commentLikeUp(long memberId, long commentId) {

        Member member = memberService.findVerifiedMember(memberId); //좋아요 누르는 회원
        Comment comment = commentService.findByComment(commentId); // 댓글
        Member commentMember = memberService.findMember(comment.getMember().getMemberId()); // 댓글 작성자


        CommentLike commentLike = commentLikeRepository.findByMemberAndComment(member, comment);

        if (commentLike == null) {
            commentLike = new CommentLike();
            commentLike.setComment(comment);
            commentLike.setMember(member);
            commentLike.setCLikeStatus(true);
            comment.setLikeCount(comment.getLikeCount() + 1);
            commentMember.setPoint(commentMember.getPoint() + 10);// 포인트 적립 로직
        }
        else if (commentLike.getCLikeStatus()) {
            commentLike.setCLikeStatus(false);
            comment.setLikeCount(comment.getLikeCount() - 1);
            commentMember.setPoint(commentMember.getPoint() - 10);// 포인트 적립 로직
        }
        else if (!commentLike.getCLikeStatus()) {
            commentLike.setCLikeStatus(true);
            comment.setLikeCount(comment.getLikeCount() + 1);
            commentMember.setPoint(commentMember.getPoint() + 10);// 포인트 적립 로직
        }

        commentLikeRepository.save(commentLike);
        memberRepository.save(member);
        memberRepository.save(commentMember);

        return commentService.findByComment(commentId);
    }
}