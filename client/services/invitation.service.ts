import { InvitationRequest } from "@/types/payload/request/invitation.request";
import { SuccessResponse } from "@/types/payload/response/common/success.response";
import { ApiClient } from "@/services/config/api.client";

export class InvitationService {
  static async sendInvitation(
    data: InvitationRequest,
  ): Promise<SuccessResponse<void>> {
    return ApiClient.post("invitation/send", {
      json: data,
    }).json<SuccessResponse<void>>();
  }
}
