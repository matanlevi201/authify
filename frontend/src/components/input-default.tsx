import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  defaultVal?: string | number | never[];
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function InputDefault({ label, name, defaultVal, className, ...props }: Props) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <Input
              id={name}
              className={`text-[0.8rem] ${className}`}
              {...props}
              {...field}
              value={field.value ?? defaultVal ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default InputDefault;
