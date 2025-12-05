import { Permission } from "@/types/entity/permission";

export type Role = {
  name: string;
  permissions: Permission[];
};
