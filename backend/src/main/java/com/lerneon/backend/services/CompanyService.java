package com.lerneon.backend.services;

import com.lerneon.backend.models.entity.Company;
import com.lerneon.backend.models.payload.request.CompanyRequest;

import java.util.List;

public interface CompanyService {
    List<Company> findAllCompanies();

    Company findCompanyById(Integer id);

    Company createCompany(CompanyRequest companyRequest);

    Company updateCompany(Integer id, CompanyRequest companyRequest);

    Company deleteCompany(Integer id);
}
