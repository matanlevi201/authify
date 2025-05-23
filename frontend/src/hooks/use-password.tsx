import {
  changePassword as ApiChangePassword,
  forgotPassword as ApiForgotPassword,
  resetPassword as ApiResetPassword,
  ChangePasswordBody,
  ForgotPasswordBody,
  ResetPasswordBody,
} from "@/api";
import { Notifications } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export interface UsePassword {
  changePassword: ({
    currentPassword,
    newPassword,
  }: ChangePasswordBody) => Promise<void>;
  forgotPassword: ({ email }: ForgotPasswordBody) => Promise<void>;
  resetPassword: ({ resetToken, password }: ResetPasswordBody) => Promise<void>;
}

export const usePassword = (): UsePassword => {
  const navigate = useNavigate();

  const changePassword = async ({
    currentPassword,
    newPassword,
  }: ChangePasswordBody) => {
    const result = await ApiChangePassword({ currentPassword, newPassword });
    if (!result.success) {
      return Notifications.errors(result.errors);
    }
    navigate("/");
  };

  const forgotPassword = async ({ email }: ForgotPasswordBody) => {
    const result = await ApiForgotPassword({ email });
    if (!result.success) {
      return Notifications.errors(result.errors);
    }
    return Notifications.success("Reset mail sent successfuly!");
  };

  const resetPassword = async ({ resetToken, password }: ResetPasswordBody) => {
    const result = await ApiResetPassword({ resetToken, password });
    if (!result.success) {
      return Notifications.errors(result.errors);
    }
    Notifications.success("Password reset successfuly!");
    navigate("/signin");
  };

  return { changePassword, forgotPassword, resetPassword };
};
