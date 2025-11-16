import { SuccessResponse } from "@/types/payload/response/common/success.response";
import { Company } from "@/types/entity/company";
import { ApiClient } from "@/services/config/api.client";
import { CompanyRequest } from "@/types/payload/request/company.request";

export class CompanyService {
  static async findAllCompanies(): Promise<SuccessResponse<Company[]>> {
    return ApiClient.get("company").json<SuccessResponse<Company[]>>();
  }

  static async findCompanyById(id: number): Promise<SuccessResponse<Company>> {
    return ApiClient.get(`company/${id}`).json<SuccessResponse<Company>>();
  }

  static async createCompany(
    data: CompanyRequest,
  ): Promise<SuccessResponse<Company>> {
    return ApiClient.post("company", {
      json: data,
    }).json<SuccessResponse<Company>>();
  }

  static async updateCompany(
    id: number,
    data: CompanyRequest,
  ): Promise<SuccessResponse<Company>> {
    return ApiClient.put(`company/${id}`, {
      json: data,
    }).json<SuccessResponse<Company>>();
  }

  static async deleteCompany(id: number): Promise<SuccessResponse<Company>> {
    return ApiClient.delete(`company/${id}`).json<SuccessResponse<Company>>();
  }
}
