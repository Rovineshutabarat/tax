package com.lerneon.backend.repositories;

import com.lerneon.backend.models.entity.Company;
import com.lerneon.backend.models.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Page<Employee> findAllByCompany(Company company, Pageable pageable);
}
