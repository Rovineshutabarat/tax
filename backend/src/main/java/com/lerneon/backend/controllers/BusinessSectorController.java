package com.lerneon.backend.controllers;

import com.lerneon.backend.models.entity.BusinessSector;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BusinessSectorController {
    ResponseEntity<SuccessResponse<List<BusinessSector>>> findAllBusinessSectors();

    ResponseEntity<SuccessResponse<BusinessSector>> findBusinessSectorById(Integer id);

    ResponseEntity<SuccessResponse<BusinessSector>> createBusinessSector(BusinessSector businessSector);

    ResponseEntity<SuccessResponse<BusinessSector>> updateBusinessSector(Integer id, BusinessSector businessSector);

    ResponseEntity<SuccessResponse<BusinessSector>> deleteBusinessSector(Integer id);
}
