import { LucideIcon } from "lucide-react";
import { NavigationSubItem } from "@/types/navigation.sub.item";

export type NavigationItem = {
    label: string;
    icon: LucideIcon;
    path?: string;
    subItems?: NavigationSubItem[];
};