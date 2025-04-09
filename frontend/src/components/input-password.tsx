import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useShowPassword } from "@/hooks/use-show-password";
import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  defaultVal?: string | number | never[];
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function InputPassword({
  label,
  name,
  defaultVal,
  className,
  ...props
}: Props) {
  const { showPassword, EyeToggler } = useShowPassword();
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
              type={showPassword ? "text" : "password"}
              leftSection={<EyeToggler />}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default InputPassword;
