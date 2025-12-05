package com.lerneon.backend.controllers;

import com.lerneon.backend.models.entity.Company;
import com.lerneon.backend.models.payload.request.CompanyRequest;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CompanyController {
    ResponseEntity<SuccessResponse<List<Company>>> findAllCompanies();

    ResponseEntity<SuccessResponse<Company>> findCompanyById(Integer id);

    ResponseEntity<SuccessResponse<Company>> createCompany(CompanyRequest companyRequest);

    ResponseEntity<SuccessResponse<Company>> updateCompany(Integer id, CompanyRequest companyRequest);

    ResponseEntity<SuccessResponse<Company>> deleteCompany(Integer id);
}
