"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

type Option = {
  label: string;
  value: number;
};

type ComboboxProps = {
  placeholder?: string;
  contents: Option[];
  value: number[];
  onValueChange: (value: number[]) => void;
};

export function Combobox({
  placeholder = "Select...",
  contents,
  value,
  onValueChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const toggleValue = (val: number) => {
    if (value.includes(val)) {
      onValueChange(value.filter((v) => v !== val));
    } else {
      onValueChange([...value, val]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {value.length > 0 ? `${value.length} selected` : placeholder}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={4}
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No data found.</CommandEmpty>

          <CommandGroup>
            {contents.map((item) => {
              const isSelected = value.includes(item.value);

              return (
                <CommandItem
                  key={item.value}
                  onSelect={() => toggleValue(item.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      isSelected ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
