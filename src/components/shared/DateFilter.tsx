"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

interface DateFilterProps {
  value: string | null;
  onChange: (date: string | null) => void;
  placeholder?: string;
}

export function DateFilter({
  value,
  onChange,
  placeholder = "Pick Date",
}: DateFilterProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      onChange(null);
      setOpen(false);
      return;
    }

    const formatted = format(date, "yyyy-MM-dd");
    onChange(formatted);
    setOpen(false);
  };

  const displayValue = value ? format(new Date(value), "PPP") : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className="justify-start text-left font-normal"
          >
            {displayValue}
          </Button>
        }
      />

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={handleSelect}
          initialFocus
        />
        {value && (
          <div className="p-3 border-t">
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                onChange(null);
                setOpen(false);
              }}
            >
              Clear
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
