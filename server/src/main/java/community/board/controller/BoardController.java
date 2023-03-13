package community.board.controller;

import community.board.dto.BoardDto;
import community.board.entity.Board;
import community.type.SearchType;
import community.board.mapper.BoardMapper;
import community.board.repository.BoardRepository;
import community.board.service.BoardService;
import community.globaldto.SingleResponseDto;
import community.like.dto.BoardLikeDto;
import community.like.service.BoardLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
@Validated
public class BoardController {
    private final BoardService boardService;
    private final BoardMapper boardMapper;
    private final BoardLikeService boardLikeService;
    private final BoardRepository boardRepository;

    @PostMapping
    public ResponseEntity postBoard(@Valid @RequestBody BoardDto.Post boardPostDto){
        Board board = boardMapper.boardPostToBoard(boardPostDto);
        Board boardCreate = boardService.createBoard(board);
        BoardDto.Response response = boardMapper.boardToBoardResponse(boardCreate);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{board-id}")
    public ResponseEntity updateBoard(@PathVariable("board-id")@Positive long boardId,
                                      @Valid @RequestBody BoardDto.Patch boardPatchDto){
        Board board = boardMapper.boardPatchToBoard(boardPatchDto);
        board.setBoardId(boardId);

        Board updateBoard = boardService.updateBoard(board);
        BoardDto.Response response = boardMapper.boardToBoardResponse(updateBoard);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping //부분검색 //http://localhost:8080/boards?searchType=CONTENTS&searchValue=검색어
    public ResponseEntity searchBoards(@RequestParam(required = false) SearchType searchType,//required = false - 선택적 파라미터
                                         @RequestParam(required = false)String searchValue,
                                         @PageableDefault(size = 10,sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) //페이지 기본값
    {
        Page<Board> boardPage = boardService.findBoards(searchType, searchValue, pageable);
        List<Board> boards = boardPage.getContent();
        List<BoardDto.Response> response = boardMapper.boardToBoardListResponse(boards);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/{board-id}")
    public ResponseEntity getBoardById(@PathVariable("board-id") @Positive long boardId){
        Board board = boardService.findBoardById(boardId);
        BoardDto.Response response = boardMapper.boardToBoardResponse(board);

        boardService.updateViewCount(boardId);      // 조회수 증가

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id") @Positive long boardId){
        boardService.deleteBoard(boardId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{board-id}/Like")
    public ResponseEntity<?> upLikeBoard(@Positive @PathVariable("board-id") long boardId,
                                         @Valid @RequestBody BoardLikeDto requestBody) {

        Board likeBoard = boardLikeService.boardLikeUP(boardId, requestBody.getMemberId());
        BoardDto.Response response = boardMapper.boardToBoardResponse(likeBoard);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
}
