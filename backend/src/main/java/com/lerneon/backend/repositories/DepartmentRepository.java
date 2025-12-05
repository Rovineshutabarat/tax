package com.lerneon.backend.repositories;

import com.lerneon.backend.models.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    Boolean existsByName(String name);
}
