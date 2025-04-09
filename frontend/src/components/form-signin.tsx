import { Card, CardContent, CardFooter } from "./ui/card";
import FormSocialButtons from "./form-social-buttons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import InputResolver from "./input-resolver";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Field } from "@/types";
import { t } from "i18next";
import { z } from "zod";

const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, "Field is required."),
});

type SigninSchema = z.infer<typeof signinSchema>;

const inputs: Field<SigninSchema>[] = [
  {
    type: "text",
    name: "email",
    label: "Email",
    placeholder: "your@email.com",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Password...",
  },
];

function FormSignin() {
  const { signin } = useAuth();

  const form = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SigninSchema) {
    const { email, password } = values;
    await signin({ email, password });
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col gap-4 py-6">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              {inputs.map((input, i) => (
                <InputResolver key={`${input.name}_${i}`} input={input} />
              ))}
              <Link
                to="/forgot-password"
                className="text-xs underline-offset-4 hover:underline text-end"
              >
                Forgot your password?
              </Link>
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

export default FormSignin;
