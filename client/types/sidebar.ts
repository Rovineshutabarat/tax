import { LucideIcon } from "lucide-react";
import { NavigationGroup } from "@/types/navigation.group";

export type Sidebar = {
  label: string;
  icon: LucideIcon;
  groups: NavigationGroup[];
};