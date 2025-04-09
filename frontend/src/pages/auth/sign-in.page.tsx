import AuthPageLayout from "@/components/auth-page-layout";
import { EAuthForms } from "@/types";

export function Signin() {
  return (
    <AuthPageLayout>
      <AuthPageLayout.Header
        title=" Welcome back !"
        text="Don't have an account?"
        link="Sign up"
        to="/signup"
      />
      <AuthPageLayout.Body authForm={EAuthForms.SIGNIN} />
      <AuthPageLayout.Footer />
    </AuthPageLayout>
  );
}
