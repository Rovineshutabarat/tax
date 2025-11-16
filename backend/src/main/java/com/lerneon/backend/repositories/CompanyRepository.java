package com.lerneon.backend.repositories;

import com.lerneon.backend.models.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
    Boolean existsByTaxId(String taxId);

    Boolean existsByName(String name);
}
