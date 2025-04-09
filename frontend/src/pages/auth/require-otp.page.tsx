import AuthPageLayout from "@/components/auth-page-layout";
import { EAuthForms } from "@/types";

export function RequireOtp() {
  return (
    <AuthPageLayout>
      <AuthPageLayout.Header title="Enter otp" />
      <AuthPageLayout.Body authForm={EAuthForms.OTP_FORM} />
    </AuthPageLayout>
  );
}
