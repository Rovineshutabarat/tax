import { SuccessResponse } from "@/types/payload/response/common/success.response";
import { Role } from "@/types/entity/role";
import { ApiClient } from "@/services/config/api.client";

export class RoleService {
  static async findAllRoles(): Promise<SuccessResponse<Role[]>> {
    return ApiClient.get("role").json<SuccessResponse<Role[]>>();
  }
}
