package com.lerneon.backend.services.implementations;

import com.lerneon.backend.models.entity.Role;
import com.lerneon.backend.repositories.RoleRepository;
import com.lerneon.backend.services.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Override
    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }
}
