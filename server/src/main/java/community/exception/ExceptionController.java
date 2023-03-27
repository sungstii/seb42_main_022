package community.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;

@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        final ErrorResponse response = ErrorResponse.of(e.getBindingResult());

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleConstraintViolationException(
            ConstraintViolationException e) {
       final ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());

       return response;
    }

    @ExceptionHandler
    public ResponseEntity handleBusinessException(BusinessLogicException e) {
       final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

       return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handleHttpMethodNotException(
            HttpRequestMethodNotSupportedException e) {

        final ErrorResponse response = ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED,
                "메소드의 문법이 다릅니다. 정확하게 입력해주세요");

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMessageNotReadableException(
            HttpMessageNotReadableException e) {

        final ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST,
                "정확하게 제이슨 요청을 해주세요");

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMissingParameterException(
            MissingServletRequestParameterException e) {

        final ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST,
                "파라미터가 일치하지 않습니다.");

        return response;
    }
}
