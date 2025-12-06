import { BaseResponse } from "@/types/payload/response/base/base.response";
import { PaginationResponse } from "@/types/payload/response/common/pagination.response";

export interface PageResponse<T> extends BaseResponse {
  data: T;
  pagination: PaginationResponse;
}
