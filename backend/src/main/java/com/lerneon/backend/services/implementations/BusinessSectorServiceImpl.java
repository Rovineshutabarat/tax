package com.lerneon.backend.services.implementations;

import com.lerneon.backend.models.entity.BusinessSector;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.repositories.BusinessSectorRepository;
import com.lerneon.backend.services.BusinessSectorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BusinessSectorServiceImpl implements BusinessSectorService {
    private final BusinessSectorRepository businessSectorRepository;

    @Override
    public List<BusinessSector> findAllBusinessSectors() {
        return businessSectorRepository.findAll();
    }

    @Override
    public BusinessSector findBusinessSectorById(Integer id) {
        return businessSectorRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Business Sector was not found")
        );
    }

    @Override
    public BusinessSector createBusinessSector(BusinessSector businessSector) {
        return businessSectorRepository.save(businessSector);
    }

    @Override
    public BusinessSector updateBusinessSector(Integer id, BusinessSector businessSector) {
        findBusinessSectorById(id);
        businessSector.setId(id);
        return businessSectorRepository.save(businessSector);
    }

    @Override
    public BusinessSector deleteBusinessSector(Integer id) {
        BusinessSector businessSector = findBusinessSectorById(id);
        businessSectorRepository.delete(businessSector);
        return businessSector;
    }
}
