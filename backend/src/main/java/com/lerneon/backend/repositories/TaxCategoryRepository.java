package com.lerneon.backend.repositories;

import com.lerneon.backend.models.entity.TaxCategory;
import com.lerneon.backend.models.enums.MarriageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaxCategoryRepository extends JpaRepository<TaxCategory, Integer> {
    Optional<TaxCategory> findByCode(String code);

    Optional<TaxCategory> findByMarriageStatusAndNumberOfDependents(MarriageStatus marriageStatus, Integer numberOfDependents);
}
