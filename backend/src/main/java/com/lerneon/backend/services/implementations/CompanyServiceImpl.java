package com.lerneon.backend.services.implementations;

import com.lerneon.backend.models.entity.BusinessSector;
import com.lerneon.backend.models.entity.Company;
import com.lerneon.backend.models.entity.CompanyPayrollSetting;
import com.lerneon.backend.models.entity.User;
import com.lerneon.backend.models.enums.CompanyType;
import com.lerneon.backend.models.enums.RoleEnum;
import com.lerneon.backend.models.exceptions.AuthException;
import com.lerneon.backend.models.exceptions.DuplicateElementException;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.models.payload.request.CompanyRequest;
import com.lerneon.backend.repositories.BusinessSectorRepository;
import com.lerneon.backend.repositories.CompanyPayrollSettingRepository;
import com.lerneon.backend.repositories.CompanyRepository;
import com.lerneon.backend.services.CompanyService;
import com.lerneon.backend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;
    private final BusinessSectorRepository businessSectorRepository;
    private final CompanyPayrollSettingRepository companyPayrollSettingRepository;
    private final UserService userService;

    @Override
    public List<Company> findAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public Company findCompanyById(Integer id) {
        return companyRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Company was not found.")
        );
    }

    @PreAuthorize("isAuthenticated()")
    @Override
    public Company createCompany(CompanyRequest companyRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!(authentication.getPrincipal() instanceof User user)) {
            throw new AuthException("Unauthorized");
        }

        BusinessSector businessSector = businessSectorRepository.findById(companyRequest.getBusinessSectorId()).orElseThrow(
                () -> new ResourceNotFoundException("Business sector was not found.")
        );

        if (companyRepository.existsByCompanyPayrollSetting_TaxId(companyRequest.getTaxId())) {
            throw new DuplicateElementException("Tax ID is already used by another company.");
        }

        if (companyRepository.existsByName(companyRequest.getName())) {
            throw new DuplicateElementException("Company name is already in use.");
        }

        CompanyPayrollSetting companyPayrollSetting = companyPayrollSettingRepository.save(CompanyPayrollSetting.builder()
                .taxId(companyRequest.getTaxId())
                .isVatRegistered(companyRequest.getIsVatRegistered())
                .businessActivityCode(companyRequest.getBusinessActivityCode())
                .build());

        Company company = companyRepository.save(Company.builder()
                .name(companyRequest.getName())
                .email(companyRequest.getEmail())
                .phoneNumber(companyRequest.getPhoneNumber())
                .establishedAt(companyRequest.getEstablishedAt())
                .businessSector(businessSector)
                .companyType(CompanyType.valueOf(companyRequest.getCompanyType()))
                .address(companyRequest.getAddress())
                .companyPayrollSetting(companyPayrollSetting)
                .build());

        userService.assignUserCompany(company, user, RoleEnum.ROLE_ADMIN);

        return company;
    }

    @PreAuthorize("isAuthenticated()")
    @Override
    public Company updateCompany(Integer id, CompanyRequest companyRequest) {
        BusinessSector businessSector = businessSectorRepository.findById(companyRequest.getBusinessSectorId()).orElseThrow(
                () -> new ResourceNotFoundException("Business sector was not found.")
        );

        if (companyRepository.existsByCompanyPayrollSetting_TaxId(companyRequest.getTaxId())) {
            throw new DuplicateElementException("Tax ID is already used by another company.");
        }

        CompanyPayrollSetting companyPayrollSetting = companyPayrollSettingRepository.save(CompanyPayrollSetting.builder()
                .taxId(companyRequest.getTaxId())
                .isVatRegistered(companyRequest.getIsVatRegistered())
                .businessActivityCode(companyRequest.getBusinessActivityCode())
                .build());

        return companyRepository.save(Company.builder()
                .name(companyRequest.getName())
                .email(companyRequest.getEmail())
                .phoneNumber(companyRequest.getPhoneNumber())
                .establishedAt(companyRequest.getEstablishedAt())
                .businessSector(businessSector)
                .companyType(CompanyType.valueOf(companyRequest.getCompanyType()))
                .address(companyRequest.getAddress())
                .companyPayrollSetting(companyPayrollSetting)
                .build());
    }

    @Override
    public Company deleteCompany(Integer id) {
        Company company = findCompanyById(id);
        companyRepository.delete(company);
        return company;
    }
}
