import { Card, CardContent } from "./ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import InputResolver from "./input-resolver";
import { Button } from "./ui/button";
import { Field } from "@/types";
import { t } from "i18next";
import { z } from "zod";
import { usePassword } from "@/hooks/use-password";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Field is required." }),
    newPassword: z
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
  .refine((data) => data.confirmPassword === data.newPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

const inputs: Field<ChangePasswordSchema>[] = [
  {
    type: "text",
    name: "currentPassword",
    label: "Your current password",
    placeholder: "Current password...",
  },
  {
    type: "password-strength",
    name: "newPassword",
    label: "Your new password",
    placeholder: "New password...",
  },
  {
    name: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "Confirm password...",
  },
];

function FormChangePassword() {
  const { changePassword } = usePassword();

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ChangePasswordSchema) {
    const { currentPassword, newPassword } = values;
    await changePassword({ currentPassword, newPassword });
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

export default FormChangePassword;
