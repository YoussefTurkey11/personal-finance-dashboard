"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps, FieldErrors } from "react-hook-form";
import { AddTransactionFormSchema } from "@/validation/transaction/transaction.schema";

type Props = {
  field: ControllerRenderProps<AddTransactionFormSchema, "date">;
  errors: FieldErrors<AddTransactionFormSchema>;
};

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function DatePickerInput({ field, errors }: Props) {
  const [open, setOpen] = React.useState(false);
  const date = field.value ? new Date(field.value) : undefined;
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  return (
    <Field className="mx-auto">
      <FieldLabel htmlFor="date-required">Pick Date</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="date-required"
          value={value}
          placeholder="June 01, 2025"
          onChange={(e) => {
            const date = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(date)) {
              setMonth(date);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <InputGroupButton
                  id="date-picker"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Select date"
                >
                  <CalendarIcon />
                  <span className="sr-only">Select date</span>
                </InputGroupButton>
              }
            />
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                month={month}
                disabled={{ after: new Date() }}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  if (!date) return;
                  const localDate = date.toLocaleDateString("en-CA");
                  field.onChange(localDate);
                  setValue(formatDate(date));
                  setOpen(false);
                }}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
