import { Card, CardContent } from "./ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePassword } from "@/hooks/use-password";
import { useSearchParams } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import InputResolver from "./input-resolver";
import { Button } from "./ui/button";
import { Field } from "@/types";
import { t } from "i18next";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

const inputs: Field<ResetPasswordSchema>[] = [
  {
    type: "password-strength",
    name: "password",
    label: "Password",
    placeholder: "Your password...",
  },
  {
    type: "password",
    name: "confirmPassword",
    label: "Confirm password",
    placeholder: "Confirm password...",
  },
];

function FormResetPassword() {
  const { resetPassword } = usePassword();
  const [searchParams] = useSearchParams();
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ResetPasswordSchema) {
    const { password } = values;
    const resetToken = searchParams.get("token") ?? "";
    await resetPassword({ resetToken, password });
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col gap-6 py-6">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {inputs.map((input, i) => (
                <InputResolver key={`${input.name}_${i}`} input={input} />
              ))}
              <Button type="submit" className="w-full">
                {t("form.submit")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default FormResetPassword;
