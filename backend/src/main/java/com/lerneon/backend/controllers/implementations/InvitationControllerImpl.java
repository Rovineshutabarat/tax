package com.lerneon.backend.controllers.implementations;

import com.lerneon.backend.controllers.InvitationController;
import com.lerneon.backend.handlers.ResponseHandler;
import com.lerneon.backend.models.payload.request.InvitationRequest;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import com.lerneon.backend.services.InvitationService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/invitation")
public class InvitationControllerImpl implements InvitationController {
    private final InvitationService invitationService;
    private final String CLIENT_URL;

    public InvitationControllerImpl(InvitationService invitationService, @Value("${client.url}") String CLIENT_URL) {
        this.invitationService = invitationService;
        this.CLIENT_URL = CLIENT_URL;
    }

    @PostMapping("/send")
    @Override
    public ResponseEntity<SuccessResponse<Void>> sendInvitation(@RequestBody @Valid InvitationRequest invitationRequest) throws MessagingException {
        invitationService.sendInvitation(invitationRequest);
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "",
                null
        );
    }

    @GetMapping("/accept")
    public ResponseEntity<Void> acceptInvitation(@RequestParam String token) {
        invitationService.acceptInvitation(token);

        String redirectUrl = CLIENT_URL + "/auth/set-password?token=" + token;

        return ResponseEntity
                .status(HttpStatus.FOUND)
                .header("Location", redirectUrl)
                .build();
    }
}
