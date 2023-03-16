package community.board.mapper;

import community.board.dto.BoardDto;
import community.board.entity.Board;
import community.board.entity.UploadFile;
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
    @Mapping(source = "uploadFiles", target = "uploadFiles")//uploadfile 매핑
    BoardDto.DetailPageResponse boardToBoardDetailPageResponse(Board board);

    @Mapping(source = "uploadFiles", target = "uploadFiles")//uploadfile 매핑 
    BoardDto.TotalPageResponse boardToBoardTotalPageResponse(Board board, List<UploadFile> uploadFiles); // 이미지첨부 게시글 Post Patch

    List<BoardDto.TotalPageResponse> boardToBoardListResponse(List<Board> boards); //검색리스트, 조회리스트

    List<BoardDto.RankResponse> boardToBoardRankResponse(List<Board> board);
}