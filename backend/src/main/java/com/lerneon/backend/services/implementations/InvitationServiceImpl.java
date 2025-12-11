package com.lerneon.backend.services.implementations;

import com.lerneon.backend.models.entity.Company;
import com.lerneon.backend.models.entity.Invitation;
import com.lerneon.backend.models.entity.User;
import com.lerneon.backend.models.enums.AccountProvider;
import com.lerneon.backend.models.exceptions.InvitationException;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.models.payload.request.InvitationRequest;
import com.lerneon.backend.models.properties.InvitationProperties;
import com.lerneon.backend.repositories.InvitationRepository;
import com.lerneon.backend.repositories.RoleRepository;
import com.lerneon.backend.services.InvitationService;
import com.lerneon.backend.services.MailService;
import com.lerneon.backend.services.UserService;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class InvitationServiceImpl implements InvitationService {
    private final InvitationRepository invitationRepository;
    private final RoleRepository roleRepository;
    private final MailService mailService;
    private final InvitationProperties invitationProperties;
    private final TemplateEngine templateEngine;
    private final UserService userService;

    @Override
    public String generateInvitationToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    @Override
    public Invitation findInvitationByToken(String token) {
        return invitationRepository.findByToken(token).orElseThrow(
                () -> new ResourceNotFoundException("Invitation was not found")
        );
    }

    @PreAuthorize("hasAuthority('EMPLOYEE_CREATE')")
    @Override
    public void sendInvitation(InvitationRequest invitationRequest) throws MessagingException {
        Company company = userService.getCurrentUserCompany();

        if (company == null) {
            throw new ResourceNotFoundException("You dont have any company yet.");
        }

        Invitation invitation = generateInvitation(invitationRequest, company);

        mailService.sendMail(invitationRequest.getEmail(), "Invitation Request", loadInvitationTemplate(invitation));
    }

    @Override
    public Invitation generateInvitation(InvitationRequest invitationRequest, Company company) {

        if (userService.existByEmail(invitationRequest.getEmail())) {
            throw new InvitationException("Email already in use.");
        }

        if (invitationRequest.getRoles() == null || invitationRequest.getRoles().isEmpty()) {
            throw new InvitationException("At least one role is required.");
        }

        if (invitationRepository.existsByEmailAndValidTrue(invitationRequest.getEmail())) {
            throw new InvitationException("An active invitation already exists for this email.");
        }

        return invitationRepository.save(Invitation.builder()
                .token(generateInvitationToken())
                .username(invitationRequest.getUsername())
                .email(invitationRequest.getEmail())
                .roles(
                        invitationRequest.getRoles()
                                .stream()
                                .map(role -> roleRepository.findByName(role)
                                        .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + role)))
                                .collect(Collectors.toList())
                )
                .company(company)
                .valid(true)
                .expireAt(LocalDateTime.now().plus(invitationProperties.getExpiration()))
                .build());
    }


    @Override
    public String loadInvitationTemplate(Invitation invitation) {
        Context context = new Context();

        String baseUrl = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .build()
                .toUriString();

        String invitationUrl = baseUrl + "/invitation/accept?token=" + invitation.getToken();

        context.setVariable("recipient_email", invitation.getEmail());
        context.setVariable("company_name", invitation.getCompany().getName());
        context.setVariable("redirect_url", invitationUrl);

        return templateEngine.process("invitation_template.html", context);
    }

    @Override
    public User acceptInvitation(String token) {
        Invitation invitation = findInvitationByToken(token);

        if (!invitation.getValid()) {
            throw new InvitationException("Invitation is not valid");
        }

        if (invitation.getExpireAt().isBefore(LocalDateTime.now())) {
            throw new InvitationException("Invitation is already expired");
        }

        invitation.setValid(false);
        invitationRepository.save(invitation);

        return userService.saveUser(User.builder()
                .email(invitation.getEmail())
                .username(invitation.getUsername())
                .isVerified(false)
                .roles(new ArrayList<>(invitation.getRoles()))
                .provider(AccountProvider.INVITATION)
                .canChangePassword(true)
                .company(invitation.getCompany())
                .build());
    }
}
