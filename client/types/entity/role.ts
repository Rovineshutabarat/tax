import { Permission } from "@/types/entity/permission";

export type Role = {
  id:number
  name: string;
  permissions: Permission[];
};
