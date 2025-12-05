package com.lerneon.backend.repositories;


import com.lerneon.backend.models.entity.CompanyPayrollSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyPayrollSettingRepository extends JpaRepository<CompanyPayrollSetting, Integer> {
}
