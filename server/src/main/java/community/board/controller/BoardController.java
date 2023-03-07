package community.board.controller;

import community.board.dto.BoardDto;
import community.board.entity.Board;
import community.board.mapper.BoardMapper;
import community.board.service.BoardService;
import community.globaldto.MultiResponseDto;
import community.globaldto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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

    @GetMapping
    public ResponseEntity getAllBoards(@RequestParam("page")int page, @RequestParam("size")int size){
        Page<Board> boardPages = boardService.findBoards(page-1, size);
        List<Board> boards = boardPages.getContent();
        List<BoardDto.Response> response = boardMapper.boardToBoardListResponse(boards);

        return new ResponseEntity<>(new MultiResponseDto<>(response,boardPages), HttpStatus.OK);
    }

    @GetMapping("/{board-id}")
    public ResponseEntity getBoardById(@PathVariable("board-id") @Positive long boardId){
        Board board = boardService.findBoardById(boardId);
        BoardDto.Response response = boardMapper.boardToBoardResponse(board);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id") @Positive long boardId){
        boardService.deleteBoard(boardId);
        return ResponseEntity.noContent().build();
    }
}
