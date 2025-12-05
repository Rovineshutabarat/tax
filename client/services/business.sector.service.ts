import { ApiClient } from "@/services/config/api.client";
import { SuccessResponse } from "@/types/payload/response/common/success.response";
import { BusinessSector } from "@/types/entity/business.sector";

export class BusinessSectorService {
  static async findAllBusinessSectors(): Promise<
    SuccessResponse<BusinessSector[]>
  > {
    return ApiClient.get("business-sector").json<
      SuccessResponse<BusinessSector[]>
    >();
  }

  static async findBusinessSectorById(
    id: number,
  ): Promise<SuccessResponse<BusinessSector>> {
    return ApiClient.get(`business-sector/{id}`).json<
      SuccessResponse<BusinessSector>
    >();
  }
}
