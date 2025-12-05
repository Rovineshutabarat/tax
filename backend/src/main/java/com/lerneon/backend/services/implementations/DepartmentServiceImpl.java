package com.lerneon.backend.services.implementations;

import com.lerneon.backend.models.entity.Company;
import com.lerneon.backend.models.entity.Department;
import com.lerneon.backend.models.exceptions.DuplicateElementException;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.models.payload.request.DepartmentRequest;
import com.lerneon.backend.repositories.DepartmentRepository;
import com.lerneon.backend.services.CompanyService;
import com.lerneon.backend.services.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final CompanyService companyService;

    @PreAuthorize("hasAuthority('DEPARTMENT_VIEW')")
    @Override
    public List<Department> findAllDepartments() {
        return departmentRepository.findAll();
    }

    @PreAuthorize("hasAuthority('DEPARTMENT_VIEW')")
    @Override
    public Department findDepartmentById(Integer id) {
        return departmentRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Department was not found")
        );
    }

    @PreAuthorize("hasAuthority('DEPARTMENT_CREATE')")
    @Override
    public Department createDepartment(DepartmentRequest departmentRequest) {
        if (departmentRepository.existsByName(departmentRequest.getName())) {
            throw new DuplicateElementException("Department already exists");
        }

        Company company = companyService.findCompanyById(departmentRequest.getCompanyId());

        return departmentRepository.save(Department.builder()
                .name(departmentRequest.getName())
                .description(departmentRequest.getDescription())
                .company(company)
                .build());
    }

    @PreAuthorize("hasAuthority('DEPARTMENT_UPDATE')")
    @Override
    public Department updateDepartment(Integer id, DepartmentRequest departmentRequest) {
        Company company = companyService.findCompanyById(departmentRequest.getCompanyId());

        return departmentRepository.save(Department.builder()
                .id(id)
                .name(departmentRequest.getName())
                .description(departmentRequest.getDescription())
                .company(company)
                .build());
    }

    @PreAuthorize("hasAuthority('DEPARTMENT_DELETE')")
    @Override
    public Department deleteDepartment(Integer id) {
        Department department = findDepartmentById(id);
        departmentRepository.delete(department);
        return department;
    }
}
