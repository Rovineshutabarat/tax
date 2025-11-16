package com.lerneon.backend.controllers.implementations;

import com.lerneon.backend.controllers.BusinessSectorController;
import com.lerneon.backend.handlers.ResponseHandler;
import com.lerneon.backend.models.entity.BusinessSector;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import com.lerneon.backend.services.BusinessSectorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/business-sector")
@AllArgsConstructor
public class BusinessSectorControllerImpl implements BusinessSectorController {
    private final BusinessSectorService businessSectorService;

    @GetMapping
    @Override
    public ResponseEntity<SuccessResponse<List<BusinessSector>>> findAllBusinessSectors() {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "Successfully retrieved all business sectors.",
                businessSectorService.findAllBusinessSectors()
        );
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<SuccessResponse<BusinessSector>> findBusinessSectorById(@PathVariable Integer id) {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "Successfully retrieved business sector with ID: " + id,
                businessSectorService.findBusinessSectorById(id)
        );
    }

    @PostMapping
    @Override
    public ResponseEntity<SuccessResponse<BusinessSector>> createBusinessSector(@RequestBody BusinessSector businessSector) {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.CREATED,
                "Business sector created successfully.",
                businessSectorService.createBusinessSector(businessSector)
        );
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<SuccessResponse<BusinessSector>> updateBusinessSector(@PathVariable Integer id, @RequestBody BusinessSector businessSector) {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "Business sector with ID " + id + " updated successfully.",
                businessSectorService.updateBusinessSector(id, businessSector)
        );
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<SuccessResponse<BusinessSector>> deleteBusinessSector(@PathVariable Integer id) {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "Business sector with ID " + id + " deleted successfully.",
                businessSectorService.deleteBusinessSector(id)
        );
    }
}
