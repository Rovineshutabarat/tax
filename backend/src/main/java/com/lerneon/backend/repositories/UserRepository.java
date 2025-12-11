package com.lerneon.backend.repositories;

import com.lerneon.backend.models.entity.Company;
import com.lerneon.backend.models.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    Page<User> findAllByCompany(Company company, Pageable pageable);
}
