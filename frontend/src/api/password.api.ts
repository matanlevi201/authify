import { makeRequest } from "@/api/make-request";
import { EHttpMethod } from "@/types";

export type AccessTokenResponse = {
  accessToken: string;
};
export type ChangePasswordBody = {
  currentPassword: string;
  newPassword: string;
};
export type ForgotPasswordBody = {
  email: string;
};
export type ResetPasswordBody = {
  resetToken: string;
  password: string;
};

const BASE_URL = "/password";

export const changePassword = async ({
  currentPassword,
  newPassword,
}: ChangePasswordBody) => {
  return await makeRequest<ChangePasswordBody, AccessTokenResponse>({
    method: EHttpMethod.PUT,
    url: BASE_URL,
    body: { currentPassword, newPassword },
  });
};

export const forgotPassword = async ({ email }: ForgotPasswordBody) => {
  return await makeRequest<ForgotPasswordBody, AccessTokenResponse>({
    method: EHttpMethod.POST,
    url: `${BASE_URL}/reset`,
    body: { email },
  });
};

export const resetPassword = async ({
  resetToken,
  password,
}: ResetPasswordBody) => {
  return await makeRequest<{ password: string }, AccessTokenResponse>({
    method: EHttpMethod.PUT,
    url: `${BASE_URL}/reset?resetToken=${resetToken}`,
    body: { password },
  });
};
