package community.board.controller;

import community.board.dto.BoardDto;
import community.board.dto.UploadDto;
import community.board.entity.Board;
import community.board.entity.UploadFile;
import community.board.service.S3Service;
import community.exception.ExceptionCode;
import community.member.entity.Member;
import community.member.service.MemberService;
import community.type.SearchType;
import community.board.mapper.BoardMapper;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    private final S3Service s3Service;
    private final MemberService memberService;

    @PostMapping("/{board-type}")
    public ResponseEntity<?> createBoard(@ModelAttribute MultipartFile[] files,
                                         @Valid @ModelAttribute BoardDto.Post boardPostDto,
                                         @PathVariable("board-type") String boardType) throws Exception {
        Board board = boardMapper.boardPostToBoard(boardPostDto);
        board.setMember(memberService.findVerifiedMember(boardPostDto.getMemberId()));
        Board boardCreate;

        //Todo : 중복코드 제거를 위해 3개의 요청을 1개의 요청으로 묶을 수 있다.
        if(boardType.equals("eco")) {
            boardCreate = boardService.createBoard(board, Board.KindOfBoard.FREE_BOARD); //게시판 종류를 입력
        }
        else if(boardType.equals("free")) {
            boardCreate = boardService.createBoard(board, Board.KindOfBoard.ECO_REVIEW);
        }
        else {
            boardCreate = boardService.createBoard(board, Board.KindOfBoard.GREEN_ACTIVE);
        }

        List<UploadFile> uploadFiles = s3Service.uploadFiles(files, boardCreate); // aws s3업로드
        List<UploadDto> uploadResponse = boardMapper.uploadFilesToUploadDtoList(uploadFiles); //업로드 dto리스트를 생성

        BoardDto.TotalPageResponse response = boardMapper.boardToBoardTotalPageResponse(boardCreate, uploadResponse);//게시글 dto에 업로드 dto담아주기
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{board-id}")
    public ResponseEntity<?> updateBoard(@PathVariable("board-id") @Positive long boardId,
                                         @ModelAttribute MultipartFile[] files,
                                         @ModelAttribute BoardDto.Patch boardPatchDto) throws Exception {
        Board board = boardMapper.boardPatchToBoard(boardPatchDto);
        // DB에서 memeber를 찾음
        board.setBoardId(boardId);
        Board updateBoard = boardService.updateBoard(board);

        List<UploadFile> uploadFiles = s3Service.uploadFiles(files, updateBoard); // aws s3업로드
        List<UploadDto> uploadResponse = boardMapper.uploadFilesToUploadDtoList(uploadFiles); //업로드 dto리스트를 생성

        BoardDto.TotalPageResponse response = boardMapper.boardToBoardTotalPageResponse(updateBoard, uploadResponse); //게시글 dto에 업로드 dto담아주기
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    /*검색 및 전체조회*/
    @GetMapping("/{board-type}") //부분검색 //http://localhost:8080/boards?searchType=CONTENTS&searchValue=검색어&page=&size
    public ResponseEntity<?> searchBoards(@RequestParam(required = false) SearchType searchType,//required = false - 선택적 파라미터
                                          @RequestParam(required = false) String searchValue,
                                          @PageableDefault(size = 100, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
                                          @PathVariable("board-type") String boardType) throws Exception //페이지 기본값
    {

        Page<Board> boardPage;

        if(boardType.equals("eco")) {
            boardPage = boardService.findBoards(Board.KindOfBoard.ECO_REVIEW, searchType, searchValue, pageable);
        }
        else if(boardType.equals("free")) {
            boardPage = boardService.findBoards(Board.KindOfBoard.FREE_BOARD, searchType, searchValue, pageable);
        }
        else {
            boardPage = boardService.rankBoards(Board.KindOfBoard.GREEN_ACTIVE, pageable);
        }

        List<Board> boards = boardPage.getContent();

        List<BoardDto.TotalPageListResponse> response = boardMapper.boardToBoardListResponse(boards);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*추천 게시판*/
    @GetMapping("/rank+{board-type}")
    public ResponseEntity<?> rankBoards(@PageableDefault(size = 5, sort = "likeCount", direction = Sort.Direction.DESC) Pageable pageable,
                                        @PathVariable("board-type") String boardType) //페이지 기본값
    {
        Page<Board> boardPage;

        if(boardType.equals("ecoBoard")) {
            boardPage = boardService.rankBoards(Board.KindOfBoard.ECO_REVIEW, pageable);
        }
        else if(boardType.equals("freeBoard")) {
            boardPage = boardService.rankBoards(Board.KindOfBoard.FREE_BOARD, pageable);
        }
        else {
            boardPage = boardService.rankBoards(Board.KindOfBoard.GREEN_ACTIVE, pageable);
        }
        List<Board> boards = boardPage.getContent();
        List<BoardDto.RankResponse> response = boardMapper.boardToBoardRankListResponse(boards);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*단건조회*/
    @GetMapping("/{board-id}")
    public ResponseEntity<?> getBoardById(@PathVariable("board-id") @Positive long boardId) throws Exception {
        boardService.updateViewCount(boardId); // 조회수 증가
        Board board = boardService.findBoard(boardId);


        List<UploadFile> uploadFiles = s3Service.uploadFiles(null, board); // aws s3업로드
        List<UploadDto> uploadResponse = boardMapper.uploadFilesToUploadDtoList(uploadFiles); //업로드 dto생성
        BoardDto.DetailPageResponse response = boardMapper.boardToBoardDetailPageResponse(board, uploadResponse); //게시글+ 업로드 dto 리스폰스

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*회원 게시물 목록 조회*/
    @GetMapping("/myBoards/{member-id}")
    public ResponseEntity<?> memberBoards(@PathVariable("member-id") @Positive long memberId,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable){
        Page<Board> boardPage = boardService.findMemberBoards(memberId, pageable);
        List<Board> boards = boardPage.getContent();

        List<BoardDto.TotalPageListResponse> response = boardMapper.boardToBoardListResponse(boards);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{board-id}")
    public ResponseEntity<?> deleteBoard(@PathVariable("board-id") @Positive long boardId) {
        Board findBoard = boardService.findBoardById(boardId);
        long findMemberId = findBoard.getMember().getMemberId();

        Member loginMember = loginMemberFindByToken();
        if(findMemberId == loginMember.getMemberId()) {
            boardService.deleteBoard(boardId);
            return ResponseEntity.noContent().build();
        } else {
            return new ResponseEntity<>(new SingleResponseDto<>(ExceptionCode.BOARD_NOT_FOUND),HttpStatus.ACCEPTED);
        }
    }

    @PostMapping("/{board-id}/Like")
    public ResponseEntity<?> upLikeBoard(@Positive @PathVariable("board-id") long boardId,
                                         @Valid @RequestBody BoardLikeDto requestBody) {

        Board likeBoard = boardLikeService.boardLikeUP(requestBody.getMemberId(), boardId);
        BoardDto.RankResponse response = boardMapper.boardToBoardRankResponse(likeBoard);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    /*토큰값으로 유저정보 찾기*/
    private Member loginMemberFindByToken(){
        String loginEmail = SecurityContextHolder.getContext().getAuthentication().getName(); // 토큰에서 유저 email 확인
        return memberService.findVerifiedEmail(loginEmail);
    }
}