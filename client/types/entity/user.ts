import { Role } from "@/types/entity/role";
import { Company } from "@/types/entity/company";

export type User = {
  id: number;
  username: string;
  email: string;
  roles: Role[];
  company: Company;
};
