import { Card, CardContent, CardFooter } from "./ui/card";
import FormSocialButtons from "./form-social-buttons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import InputResolver from "./input-resolver";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "./ui/button";
import { Field } from "@/types";
import { t } from "i18next";
import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
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

type SignupSchema = z.infer<typeof signupSchema>;

const inputs: Field<SignupSchema>[] = [
  {
    type: "text",
    name: "email",
    label: "Email",
    placeholder: "your@email.com",
  },
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

function FormSignup() {
  const { signup } = useAuth();
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignupSchema) {
    const { email, password } = values;
    await signup({ email, password });
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col gap-4 py-6">
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

        <CardFooter>
          <FormSocialButtons />
        </CardFooter>
      </Card>
    </div>
  );
}

export default FormSignup;
