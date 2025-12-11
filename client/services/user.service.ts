import { UpdateProfileRequest } from "@/types/payload/request/update.profile.request";
import { SuccessResponse } from "@/types/payload/response/common/success.response";
import { User } from "@/types/entity/user";
import { ApiClient } from "@/services/config/api.client";
import { SetPasswordRequest } from "@/types/payload/request/set.password.request";

export class UserService {
  static async updateUser(
    id: number | undefined,
    data: UpdateProfileRequest,
  ): Promise<SuccessResponse<User>> {
    return await ApiClient.put(`user/${id}`, {
      json: data,
    }).json<SuccessResponse<User>>();
  }

  static async setPassword(
    token: string,
    data: SetPasswordRequest,
  ): Promise<SuccessResponse<User>> {
    return ApiClient.post("user/set-password", {
      searchParams: { token },
      json: data,
    }).json<SuccessResponse<User>>();
  }
}
