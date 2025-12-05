"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDisplayDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatToLocalDateString(date: Date | undefined) {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

function isValidDate(date: Date | undefined) {
  return !!date && !isNaN(date.getTime());
}

export function DatePicker({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  const initialDate = value ? new Date(value) : new Date();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(initialDate);
  const [month, setMonth] = React.useState<Date | undefined>(initialDate);
  const [inputValue, setInputValue] = React.useState(formatDisplayDate(date));

  React.useEffect(() => {
    if (value) {
      const parsed = new Date(value);
      setDate(parsed);
      setInputValue(formatDisplayDate(parsed));
      setMonth(parsed);
    }
  }, [value]);

  const handleSelect = (selected: Date | undefined) => {
    setDate(selected);
    setInputValue(formatDisplayDate(selected));
    setOpen(false);

    const formatted = formatToLocalDateString(selected);
    onChange?.(formatted);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={inputValue}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const str = e.target.value;
            setInputValue(str);
            const parsed = new Date(str);
            if (isValidDate(parsed)) {
              setDate(parsed);
              setMonth(parsed);
              const formatted = formatToLocalDateString(parsed);
              onChange?.(formatted);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
