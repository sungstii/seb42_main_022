package community.board.mapper;

import community.board.dto.BoardDto;
import community.board.entity.Board;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BoardMapper {
    Board boardPostToBoard(BoardDto.Post boardPostDto); //boardPostDto -> board
    Board boardPatchToBoard(BoardDto.Patch boardPatchDto); //boardPatchDto -> board
    BoardDto.Response boardToBoardResponse(Board board); //board -> response
    List<BoardDto.Response> boardToBoardListResponse(List<Board> boards);
}