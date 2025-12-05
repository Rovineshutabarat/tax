package com.lerneon.backend.controllers.implementations;

import com.lerneon.backend.controllers.CompanyController;
import com.lerneon.backend.handlers.ResponseHandler;
import com.lerneon.backend.models.entity.Company;
import com.lerneon.backend.models.payload.request.CompanyRequest;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import com.lerneon.backend.services.CompanyService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/company")
@AllArgsConstructor
public class CompanyControllerImpl implements CompanyController {
    private final CompanyService companyService;

    @GetMapping
    @Override
    public ResponseEntity<SuccessResponse<List<Company>>> findAllCompanies() {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "Successfully retrieved all companies.",
                companyService.findAllCompanies()
        );
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<SuccessResponse<Company>> findCompanyById(@PathVariable Integer id) {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "Successfully retrieved company with ID: " + id,
                companyService.findCompanyById(id)
        );
    }

    @PostMapping
    @Override
    public ResponseEntity<SuccessResponse<Company>> createCompany(@RequestBody @Valid CompanyRequest companyRequest) {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.CREATED,
                "Company created successfully.",
                companyService.createCompany(companyRequest)
        );
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<SuccessResponse<Company>> updateCompany(@PathVariable Integer id, @RequestBody @Valid CompanyRequest companyRequest) {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "Company with ID " + id + " updated successfully.",
                companyService.updateCompany(id, companyRequest)
        );
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<SuccessResponse<Company>> deleteCompany(@PathVariable Integer id) {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "Company with ID " + id + " deleted successfully.",
                companyService.deleteCompany(id)
        );
    }
}
