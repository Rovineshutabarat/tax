package com.lerneon.backend.controllers;

import com.lerneon.backend.models.payload.request.InvitationRequest;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;

public interface InvitationController {
    ResponseEntity<SuccessResponse<Void>> sendInvitation(InvitationRequest invitationRequest) throws MessagingException;
}
