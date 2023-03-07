package community.comment.mapper;

import community.comment.dto.CommentDto;
import community.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentDto.Post commentPostDto);
    Comment commentPatchDtoToComment(CommentDto.Patch commentPatchDto);
    CommentDto.Response commentToCommentResponse(Comment comment);
    List<CommentDto.Response> commentToCommentResponses(List<Comment> comments);
}
