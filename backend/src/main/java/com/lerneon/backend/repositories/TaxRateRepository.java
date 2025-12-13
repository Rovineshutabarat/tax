package com.lerneon.backend.repositories;

import com.lerneon.backend.models.entity.TaxRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaxRateRepository extends JpaRepository<TaxRate, Integer> {
}
