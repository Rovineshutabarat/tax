package com.lerneon.backend.services;

import com.lerneon.backend.models.entity.BusinessSector;

import java.util.List;

public interface BusinessSectorService {
    List<BusinessSector> findAllBusinessSectors();

    BusinessSector findBusinessSectorById(Integer id);

    BusinessSector createBusinessSector(BusinessSector businessSector);

    BusinessSector updateBusinessSector(Integer id, BusinessSector businessSector);

    BusinessSector deleteBusinessSector(Integer id);
}
