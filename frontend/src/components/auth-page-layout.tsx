import FormForgotFassword from "./form-forgot-password";
import FormResetPassword from "./form-reset-password";
import FormChangePassword from "./form-change-password";
import { GalleryVerticalEndIcon } from "lucide-react";
import FormRequireOtp from "./form-require-otp";
import { Link } from "react-router-dom";
import FormSignup from "./form-signup";
import FormSignin from "./form-signin";
import { EAuthForms } from "@/types";
import { ReactNode } from "react";

interface AuthHeaderProps {
  title: string;
  text?: string;
  link?: string;
  to?: string;
}

export function Header({ title, text, link, to }: AuthHeaderProps) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-sm mx-auto">
      <div className="flex items-center gap-2 self-center font-medium">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEndIcon className="size-4" />
        </div>
        {title}
      </div>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        {text}{" "}
        {to && (
          <Link to={to} className="underline underline-offset-4">
            {link}
          </Link>
        )}
      </div>
    </div>
  );
}

export function Body({ authForm }: { authForm: EAuthForms }) {
  return (
    <div className="mx-auto w-full max-w-md">
      {authForm === EAuthForms.SIGNUP && <FormSignup />}
      {authForm === EAuthForms.SIGNIN && <FormSignin />}
      {authForm === EAuthForms.FORGOT_PASSWORD && <FormForgotFassword />}
      {authForm === EAuthForms.RESET_PASSWORD && <FormResetPassword />}
      {authForm === EAuthForms.CHANGE_PASSWORD && <FormChangePassword />}
      {authForm === EAuthForms.OTP_FORM && <FormRequireOtp />}
    </div>
  );
}

export function Footer() {
  return (
    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
      <span>By clicking continue, you agree to our </span>
      <Link to="#">Terms of Service</Link>
      <span> and </span>
      <Link to="#">Privacy Policy</Link>
    </div>
  );
}

function AuthPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      {children}
    </div>
  );
}

AuthPageLayout.Header = Header;
AuthPageLayout.Body = Body;
AuthPageLayout.Footer = Footer;

export default AuthPageLayout;
