package com.lerneon.backend.controllers.implementations;

import com.lerneon.backend.controllers.EmployeeController;
import com.lerneon.backend.handlers.ResponseHandler;
import com.lerneon.backend.models.entity.Employee;
import com.lerneon.backend.models.payload.request.EmployeeRequest;
import com.lerneon.backend.models.payload.response.common.PageResponse;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import com.lerneon.backend.services.EmployeeService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/employee")
@AllArgsConstructor
public class EmployeeControllerImpl implements EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping
    @Override
    public ResponseEntity<PageResponse<Employee>> findAllEmployees(@PageableDefault Pageable pageable) {
        return ResponseHandler.buildPaginationResponse(
                HttpStatus.OK,
                "",
                employeeService.findAllEmployees(pageable)
        );
    }

    @PostMapping
    @Override
    public ResponseEntity<SuccessResponse<Employee>> addEmployee(@RequestBody @Valid EmployeeRequest employeeRequest) {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "",
                employeeService.addEmployee(employeeRequest)
        );
    }
}

