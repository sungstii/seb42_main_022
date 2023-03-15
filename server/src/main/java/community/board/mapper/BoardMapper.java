package community.board.mapper;

import community.board.dto.BoardDto;
import community.board.entity.Board;
import community.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BoardMapper {
    Board boardPostToBoard(BoardDto.Post boardPostDto); //boardPostDto -> board
    Board boardPatchToBoard(BoardDto.Patch boardPatchDto); //boardPatchDto -> board
    BoardDto.Response boardToBoardResponse(Board board); //board -> response

    BoardDto.DetailPageResponse boardToBoardDetailPageResponse(Board board);


    BoardDto.TotalPageResponse boardToBoardTotalPageResponse(Board board);
    List<BoardDto.Response> boardToBoardListResponse(List<Board> boards);
}