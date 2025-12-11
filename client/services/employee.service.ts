import { PageResponse } from "@/types/payload/response/common/page.response";
import { User } from "@/types/entity/user";
import { ApiClient } from "@/services/config/api.client";

export class EmployeeService {
  static async findAllEmployees(): Promise<PageResponse<User[]>> {
    return ApiClient.get("employee").json<PageResponse<User[]>>();
  }
}
