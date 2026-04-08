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

type SelectOption<T = string> = {
  value: T;
  label: string;
};

type FieldSelectFormProps<T extends FieldValues, V> = {
  label: string;
  id: Path<T>;
  errors: FieldErrors<T>;
  field: {
    value: V;
    onChange: (value: V) => void;
    name: string;
  };
  options: SelectOption<V>[];
  placeholder?: string;
};

const FieldSelectForm = <T extends FieldValues, V>({
  label,
  id,
  errors,
  field,
  options,
  placeholder = "Select an option",
}: FieldSelectFormProps<T, V>) => {
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
        value={field.value !== undefined ? String(field.value) : ""}
        onValueChange={(val) => {
          const selected = options.find((opt) => String(opt.value) === val);
          if (selected) {
            field.onChange(selected.value);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={String(option.value)}
                value={String(option.value)}
              >
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
