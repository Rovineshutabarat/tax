package com.lerneon.backend.services;

import com.lerneon.backend.models.entity.Role;

import java.util.List;

public interface RoleService {
    List<Role> findAllRoles();
}
