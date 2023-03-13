package community.board.service;

import community.board.entity.Board;
import community.board.repository.BoardRepository;
import community.exception.BusinessLogicException;
import community.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    /*게시글 등록*/
    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }

    /*게시글 수정*/
    public Board updateBoard(Board board) {
        Board findBoard = findBoardById(board.getBoardId());

        Optional.ofNullable(board.getTitle()).ifPresent(findBoard::setTitle);
        Optional.ofNullable(board.getContents()).ifPresent(findBoard::setContents);

        return boardRepository.save(findBoard);
    }

    /*게시글 전체조회*/
    public Page<Board> findBoards(int page, int size) {
        return boardRepository.findAll(PageRequest.of(page, size,
                Sort.by("boardId").descending()));
    }

    /*게시글 삭제*/
    public void deleteBoard(Long boardId) {
        boardRepository.deleteById(boardId);
    }

    /*게시글 게시글ID 찾기*/
    public Board findBoardById(long boardId) {
        Optional<Board> optionalQuestion = boardRepository.findById(boardId);
        return optionalQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }

    @Transactional
    public int updateViewCount(Long id) {
        return boardRepository.updateViewCount(id);
    }
}