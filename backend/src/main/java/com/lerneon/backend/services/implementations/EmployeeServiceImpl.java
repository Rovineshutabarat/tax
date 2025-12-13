package com.lerneon.backend.services.implementations;

import com.lerneon.backend.models.entity.Company;
import com.lerneon.backend.models.entity.Department;
import com.lerneon.backend.models.entity.Employee;
import com.lerneon.backend.models.entity.Role;
import com.lerneon.backend.models.enums.EmployeeStatus;
import com.lerneon.backend.models.enums.Gender;
import com.lerneon.backend.models.enums.MarriageStatus;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.models.payload.request.EmployeeRequest;
import com.lerneon.backend.repositories.EmployeeRepository;
import com.lerneon.backend.repositories.RoleRepository;
import com.lerneon.backend.services.DepartmentService;
import com.lerneon.backend.services.EmployeeService;
import com.lerneon.backend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final UserService userService;
    private final EmployeeRepository employeeRepository;
    private final RoleRepository roleRepository;
    private final DepartmentService departmentService;

    @PreAuthorize("hasAuthority('EMPLOYEE_VIEW')")
    @Override
    public Page<Employee> findAllEmployees(Pageable pageable) {
        Company company = userService.getCurrentUserCompany();
        return employeeRepository.findAllByCompany(company, pageable);
    }

    @Override
    public Employee addEmployee(EmployeeRequest employeeRequest) {
        Company company = userService.getCurrentUserCompany();
        Department department = departmentService.findDepartmentById(employeeRequest.getDepartmentId());

        List<Role> roles = employeeRequest.getRoleIds().stream().map(id -> roleRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Role was not found")
        )).toList();

        return employeeRepository.save(Employee.builder()
                .name(employeeRequest.getName())
                .email(employeeRequest.getEmail())
                .phoneNumber(employeeRequest.getPhoneNumber())
                .taxId(employeeRequest.getTaxId())
                .baseSalary(employeeRequest.getBaseSalary())
                .marriageStatus(MarriageStatus.valueOf(employeeRequest.getMarriageStatus()))
                .numberOfDependents(employeeRequest.getNumberOfDependents())
                .employeeStatus(EmployeeStatus.valueOf(employeeRequest.getEmployeeStatus()))
                .gender(Gender.valueOf(employeeRequest.getGender()))
                .birthDate(employeeRequest.getBirthDate())
                .department(department)
                .roles(roles)
                .company(company)
                .build());
    }
}