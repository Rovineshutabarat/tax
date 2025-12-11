package com.lerneon.backend.services;

import com.lerneon.backend.models.entity.Company;
import com.lerneon.backend.models.entity.Invitation;
import com.lerneon.backend.models.entity.User;
import com.lerneon.backend.models.payload.request.InvitationRequest;
import jakarta.mail.MessagingException;

public interface InvitationService {
    String generateInvitationToken();

    Invitation findInvitationByToken(String token);

    void sendInvitation(InvitationRequest invitationRequest) throws MessagingException;

    Invitation generateInvitation(InvitationRequest invitationRequest, Company company);

    String loadInvitationTemplate(Invitation invitation);

    User acceptInvitation(String token);
}
