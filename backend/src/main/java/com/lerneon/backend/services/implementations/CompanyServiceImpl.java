package com.lerneon.backend.services.implementations;

import com.lerneon.backend.models.entity.BusinessSector;
import com.lerneon.backend.models.entity.Company;
import com.lerneon.backend.models.entity.CompanyPayrollSetting;
import com.lerneon.backend.models.enums.CompanyType;
import com.lerneon.backend.models.enums.GrossNetOption;
import com.lerneon.backend.models.exceptions.DuplicateElementException;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.models.payload.request.CompanyRequest;
import com.lerneon.backend.repositories.BusinessSectorRepository;
import com.lerneon.backend.repositories.CompanyPayrollSettingRepository;
import com.lerneon.backend.repositories.CompanyRepository;
import com.lerneon.backend.services.CompanyService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;
    private final BusinessSectorRepository businessSectorRepository;
    private final CompanyPayrollSettingRepository companyPayrollSettingRepository;

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

    @Override
    public Company createCompany(CompanyRequest companyRequest) {
        BusinessSector businessSector = businessSectorRepository.findById(companyRequest.getBusinessSectorId()).orElseThrow(
                () -> new ResourceNotFoundException("Business sector was not found.")
        );

        if (companyRepository.existsByTaxId(companyRequest.getTaxId())) {
            throw new DuplicateElementException("Tax ID is already used by another company.");
        }

        if (companyRepository.existsByName(companyRequest.getName())) {
            throw new DuplicateElementException("Company name is already in use.");
        }

        CompanyPayrollSetting companyPayrollSetting = companyPayrollSettingRepository.save(CompanyPayrollSetting.builder()
                .isVatRegistered(companyRequest.getIsVatRegistered())
                .grossNetOption(GrossNetOption.valueOf(companyRequest.getGrossNetOption()))
                .build());

        return companyRepository.save(Company.builder()
                .name(companyRequest.getName())
                .companyPayrollSetting(companyPayrollSetting)
                .taxId(companyRequest.getTaxId())
                .businessRegistrationNumber(companyRequest.getBusinessRegistrationNumber())
                .tradeLicenseNumber(companyRequest.getTradeLicenseNumber())
                .email(companyRequest.getEmail())
                .phoneNumber(companyRequest.getPhoneNumber())
                .address(companyRequest.getAddress())
                .taxOfficeAddress(companyRequest.getTaxOfficeAddress())
                .companyType(CompanyType.valueOf(companyRequest.getCompanyType()))
                .businessSector(businessSector)
                .establishedAt(companyRequest.getEstablishedAt())
                .build());
    }

    @Override
    public Company updateCompany(Integer id, CompanyRequest companyRequest) {
        findCompanyById(id);
        BusinessSector businessSector = businessSectorRepository.findById(companyRequest.getBusinessSectorId()).orElseThrow(
                () -> new ResourceNotFoundException("Business sector was not found.")
        );

        return companyRepository.save(Company.builder()
                .id(id)
                .name(companyRequest.getName())
                .taxId(companyRequest.getTaxId())
                .email(companyRequest.getEmail())
                .phoneNumber(companyRequest.getPhoneNumber())
                .address(companyRequest.getAddress())
                .businessSector(businessSector)
                .build());
    }

    @Override
    public Company deleteCompany(Integer id) {
        Company company = findCompanyById(id);
        companyRepository.delete(company);
        return company;
    }
}
