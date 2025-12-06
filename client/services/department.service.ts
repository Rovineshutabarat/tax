import { PageResponse } from "@/types/payload/response/common/page.response";
import { Department } from "@/types/entity/department";
import { ApiClient } from "@/services/config/api.client";
import { DepartmentRequest } from "@/types/payload/request/department.request";
import { SuccessResponse } from "@/types/payload/response/common/success.response";

export class DepartmentService {
  static async findAllDepartments(): Promise<PageResponse<Department[]>> {
    return await ApiClient.get("department").json<PageResponse<Department[]>>();
  }

  static async findDepartmentById(
    id: number,
  ): Promise<PageResponse<Department>> {
    return await ApiClient.get(`department/${id}`).json<
      PageResponse<Department>
    >();
  }

  static async createDepartment(
    data: DepartmentRequest,
  ): Promise<SuccessResponse<Department>> {
    return ApiClient.post("department", {
      json: data,
    }).json<SuccessResponse<Department>>();
  }

  static async updateDepartment(
    id: number,
    data: DepartmentRequest,
  ): Promise<SuccessResponse<Department>> {
    return ApiClient.put(`department/${id}`, {
      json: data,
    }).json<SuccessResponse<Department>>();
  }

  static async deleteDepartment(
    id: number,
  ): Promise<SuccessResponse<Department>> {
    return ApiClient.delete(`department/${id}`).json<
      SuccessResponse<Department>
    >();
  }
}
