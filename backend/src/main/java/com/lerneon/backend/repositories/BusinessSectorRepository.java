package com.lerneon.backend.repositories;

import com.lerneon.backend.models.entity.BusinessSector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessSectorRepository extends JpaRepository<BusinessSector, Integer> {
}
