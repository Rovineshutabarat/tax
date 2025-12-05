import { NavigationItem } from "@/types/navigation.item";

export type NavigationGroup = {
  label: string;
  items?: NavigationItem[];
};