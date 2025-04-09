import { Card, CardContent } from "./ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePassword } from "@/hooks/use-password";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import InputResolver from "./input-resolver";
import { Button } from "./ui/button";
import { Field } from "@/types";
import { t } from "i18next";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

const inputs: Field<ForgotPasswordSchema>[] = [
  {
    type: "text",
    name: "email",
    label: "Email",
    placeholder: "your@email.com",
  },
];

function FormForgotFassword() {
  const { forgotPassword } = usePassword();

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordSchema) {
    const { email } = values;
    await forgotPassword({ email });
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

export default FormForgotFassword;
