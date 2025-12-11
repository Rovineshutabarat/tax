package com.lerneon.backend.services.implementations;

import com.lerneon.backend.models.entity.Company;
import com.lerneon.backend.models.entity.User;
import com.lerneon.backend.repositories.RoleRepository;
import com.lerneon.backend.repositories.UserRepository;
import com.lerneon.backend.services.EmployeeService;
import com.lerneon.backend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final UserRepository userRepository;
    private final UserService userService;
    private final RoleRepository roleRepository;

    @PreAuthorize("hasAuthority('EMPLOYEE_VIEW')")
    @Override
    public Page<User> findAllEmployees(Pageable pageable) {
        Company company = userService.getCurrentUserCompany();
        return userRepository.findAllByCompany(company, pageable);
    }
}