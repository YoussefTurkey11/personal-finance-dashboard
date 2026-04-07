import { FieldErrors, FieldValues, Path } from "react-hook-form";
import { Field, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Alert, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";

type SelectOption = {
  value: string;
  label: string;
};

type FieldSelectFormProps<T extends FieldValues> = {
  label: string;
  id: Path<T>;
  errors: FieldErrors<T>;
  field: {
    value: string;
    onChange: (value: string) => void;
    name: string;
  };
  options: SelectOption[];
  placeholder?: string;
};

const FieldSelectForm = <T extends FieldValues>({
  label,
  id,
  errors,
  field,
  options,
  placeholder = "Select an option",
}: FieldSelectFormProps<T>) => {
  const selectedValue = field.value;

  return (
    <Field>
      <FieldLabel
        htmlFor={id}
        className={`capitalize cursor-pointer ${errors[id] ? "text-destructive" : ""}`}
      >
        {label}
      </FieldLabel>

      <Select
        name={field.name}
        value={selectedValue}
        onValueChange={(val) => field.onChange(val as string)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {errors[id] && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>{errors[id]?.message as string}</AlertTitle>
        </Alert>
      )}
    </Field>
  );
};

export default FieldSelectForm;
