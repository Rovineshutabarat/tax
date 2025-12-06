package com.lerneon.backend.handlers;

import com.lerneon.backend.models.enums.ResponseStatus;
import com.lerneon.backend.models.payload.response.common.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.Collectors;

public class ResponseHandler {
    public static <T> ResponseEntity<SuccessResponse<T>> buildSuccessResponse(
            HttpStatus httpStatus,
            String message,
            T data) {
        return new ResponseEntity<>(SuccessResponse.<T>builder()
                .status(ResponseStatus.SUCCESS)
                .code(httpStatus.value())
                .message(message)
                .data(data)
                .build(), httpStatus);
    }

    public static <T> ResponseEntity<PageResponse<T>> buildPaginationResponse(HttpStatus httpStatus, String message, Page<T> page) {
        return new ResponseEntity<>(PageResponse.<T>builder()
                .status(ResponseStatus.SUCCESS)
                .code(httpStatus.value())
                .message(message)
                .data(page.getContent())
                .pagination(PaginationResponse.builder()
                        .page(page.getPageable().getPageNumber())
                        .size(page.getPageable().getPageSize())
                        .totalElements(page.getTotalElements())
                        .totalPages(page.getTotalPages())
                        .hasNext(page.hasNext())
                        .hasPrevious(page.hasPrevious())
                        .build())
                .build(), httpStatus);
    }

    public static ResponseEntity<ErrorResponse> buildErrorResponse(
            HttpStatus httpStatus,
            String message,
            HttpServletRequest httpServletRequest) {
        return new ResponseEntity<>(ErrorResponse.builder()
                .status(ResponseStatus.ERROR)
                .code(httpStatus.value())
                .message(message)
                .path(httpServletRequest.getRequestURI())
                .timestamp(LocalDateTime.now())
                .build(), httpStatus);
    }

    public static ResponseEntity<ValidationErrorResponse> buildValidationErrorResponse(
            HttpStatus httpStatus,
            HttpServletRequest httpServletRequest,
            MethodArgumentNotValidException exception) {
        return new ResponseEntity<>(ValidationErrorResponse.builder()
                .status(ResponseStatus.VALIDATION_ERROR)
                .code(httpStatus.value())
                .message("Validation Error")
                .path(httpServletRequest.getRequestURI())
                .fieldErrors(extractFieldErrors(exception))
                .timestamp(LocalDateTime.now())
                .build(), httpStatus);
    }

    private static Map<String, String> extractFieldErrors(MethodArgumentNotValidException exception) {
        return exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .filter(error -> error.getDefaultMessage() != null)
                .collect(Collectors.toMap(
                        FieldError::getField,
                        FieldError::getDefaultMessage,
                        (ppk1, ppk2) -> ppk1)
                );
    }
}
