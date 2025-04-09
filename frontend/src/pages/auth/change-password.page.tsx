import AuthPageLayout from "@/components/auth-page-layout";
import { EAuthForms } from "@/types";

export function ChangePassword() {
  return (
    <AuthPageLayout>
      <AuthPageLayout.Header
        title="Change your password"
        text="Never mind ?"
        link="Home"
        to="/"
      />
      <AuthPageLayout.Body authForm={EAuthForms.CHANGE_PASSWORD} />
      <AuthPageLayout.Footer />
    </AuthPageLayout>
  );
}
