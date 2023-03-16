package community.board.mapper;

import community.board.dto.BoardDto;
import community.board.dto.UploadDto;
import community.board.entity.Board;
import community.board.entity.UploadFile;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BoardMapper {
    Board boardPostToBoard(BoardDto.Post boardPostDto); //boardPostDto -> board
    Board boardPatchToBoard(BoardDto.Patch boardPatchDto); //boardPatchDto -> board
    BoardDto.DetailPageResponse boardToBoardDetailPageResponse(Board board, List<UploadDto> uploadDto); //단건조회 관련 매핑 (답글 포함)
    List<BoardDto.TotalPageResponse> boardToBoardListResponse(List<Board> boards); //검색리스트, 조회리스트
    List<BoardDto.RankResponse> boardToBoardRankListResponse(List<Board> board); // 추천 게시글용 매핑
    BoardDto.RankResponse boardToBoardRankResponse(Board board); // 좋아요 누르기용 매핑
    BoardDto.TotalPageResponse boardToBoardTotalPageResponse(Board board, List<UploadDto> uploadDto); //매핑된 업로드리스트 출력
    List<UploadDto> uploadFilesToUploadDtoList(List<UploadFile> uploadFiles); // 업로드 엔티티 dto 매핑
    //@Mapping(source = "uploadFiles", target = "uploadFiles")//uploadfile 매핑
    //BoardDto.TotalPageResponse boardToBoardTotalPageResponse(Board board, List<UploadFile> uploadFiles); // 이미지 엔티티와 매핑
}