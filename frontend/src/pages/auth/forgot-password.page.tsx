import AuthPageLayout from "@/components/auth-page-layout";
import { EAuthForms } from "@/types";

export function ForgotPassword() {
  return (
    <AuthPageLayout>
      <AuthPageLayout.Header
        title="Enter email to reset password"
        text="Remember now? Great !"
        link="Sign in"
        to="/signin"
      />
      <AuthPageLayout.Body authForm={EAuthForms.FORGOT_PASSWORD} />
      <AuthPageLayout.Footer />
    </AuthPageLayout>
  );
}
