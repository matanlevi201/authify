import {
  ChangePasswordBody,
  ForgotPasswordBody,
  ResetPasswordBody,
  ChangePasswordResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
} from "common";
import { makeRequest } from "@/api/make-request";
import { EHttpMethod } from "@/types";

const BASE_URL = "/password";

export const changePassword = async ({
  currentPassword,
  newPassword,
}: ChangePasswordBody) => {
  return await makeRequest<ChangePasswordBody, ChangePasswordResponse>({
    method: EHttpMethod.PUT,
    url: BASE_URL,
    body: { currentPassword, newPassword },
  });
};

export const forgotPassword = async ({ email }: ForgotPasswordBody) => {
  return await makeRequest<ForgotPasswordBody, ForgotPasswordResponse>({
    method: EHttpMethod.POST,
    url: `${BASE_URL}/reset`,
    body: { email },
  });
};

export const resetPassword = async ({
  resetToken,
  password,
}: ResetPasswordBody) => {
  return await makeRequest<{ password: string }, ResetPasswordResponse>({
    method: EHttpMethod.PUT,
    url: `${BASE_URL}/reset?resetToken=${resetToken}`,
    body: { password },
  });
};
