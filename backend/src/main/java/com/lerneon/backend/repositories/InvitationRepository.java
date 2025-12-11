package com.lerneon.backend.repositories;

import com.lerneon.backend.models.entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Integer> {
    Optional<Invitation> findByToken(String token);

    Boolean existsByEmailAndValidTrue(String email);
}
