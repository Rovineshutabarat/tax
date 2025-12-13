import { PageResponse } from "@/types/payload/response/common/page.response";
import { ApiClient } from "@/services/config/api.client";
import { Employee } from "@/types/entity/employee";
import { EmployeeRequest } from "@/types/payload/request/employee.request";
import { SuccessResponse } from "@/types/payload/response/common/success.response";

export class EmployeeService {
  static async findAllEmployees(): Promise<PageResponse<Employee[]>> {
    return ApiClient.get("employee").json<PageResponse<Employee[]>>();
  }

  static async addEmployee(
    data: EmployeeRequest,
  ): Promise<SuccessResponse<Employee>> {
    return ApiClient.post("employee", { json: data }).json<
      SuccessResponse<Employee>
    >();
  }
}
