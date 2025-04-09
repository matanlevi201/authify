import AuthPageLayout from "@/components/auth-page-layout";
import { EAuthForms } from "@/types";

export function Signup() {
  return (
    <AuthPageLayout>
      <AuthPageLayout.Header
        title="Welcome to Acme Inc."
        text="Already have an account?"
        link="Sign in"
        to="/signin"
      />
      <AuthPageLayout.Body authForm={EAuthForms.SIGNUP} />
      <AuthPageLayout.Footer />
    </AuthPageLayout>
  );
}
