import AuthPageLayout from "@/components/auth-page-layout";
import { EAuthForms } from "@/types";

export function ResetPassword() {
  return (
    <AuthPageLayout>
      <AuthPageLayout.Header
        title="Reset your password"
        text="Remember now? Great !"
        link="Sign in"
        to="/signin"
      />
      <AuthPageLayout.Body authForm={EAuthForms.RESET_PASSWORD} />
      <AuthPageLayout.Footer />
    </AuthPageLayout>
  );
}
