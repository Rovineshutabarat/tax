package com.lerneon.backend.services;

import com.lerneon.backend.models.entity.Company;
import com.lerneon.backend.models.entity.User;
import com.lerneon.backend.models.payload.request.CompanyRequest;
import com.lerneon.backend.models.payload.request.InvitationRequest;

import java.util.List;

public interface CompanyService {
    List<Company> findAllCompanies();

    Company findCompanyById(Integer id);

    Company createCompany(CompanyRequest companyRequest);

    Company updateCompany(Integer id, CompanyRequest companyRequest);

    Company deleteCompany(Integer id);
}
