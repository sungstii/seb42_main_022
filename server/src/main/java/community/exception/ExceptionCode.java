package community.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    BOARD_NOT_FOUND(404,"Board not found"),
    MEMBER_EXISTS(409, "Member exists"),
    BOARD_EXISTS(409, "Board exists"),
    BOARD_CANNOT_CHANGE(403,"권한이 없습니다."),
    TOKEN_NOT_FOUND(404, "token not found"),
    NOT_AUTHORIZED(404, "not authorized, 인증받지 않은 접근입니다"),
    PASSWORD_NOT_CONFIRMED(404, "Password not confirmed");

    @Getter
    private final int status;


    @Getter
    private final String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
