import { makeRequest } from "@/api/make-request";
import { EHttpMethod } from "@/types";

export type AccessTokenResponse = {
  accessToken: string;
};
export type SignBody = {
  email: string;
  password: string;
};

const BASE_URL = "/auth";

export const signup = async ({ email, password }: SignBody) => {
  return await makeRequest<SignBody, AccessTokenResponse>({
    method: EHttpMethod.POST,
    url: `${BASE_URL}/users`,
    body: { email, password },
  });
};

export const signin = async ({ email, password }: SignBody) => {
  return await makeRequest<SignBody, AccessTokenResponse>({
    method: EHttpMethod.POST,
    url: `${BASE_URL}/sessions`,
    body: { email, password },
  });
};

export const signout = async () => {
  return await makeRequest<SignBody, null>({
    method: EHttpMethod.DELETE,
    url: `${BASE_URL}/sessions`,
  });
};

export const refreshToken = async () => {
  return await makeRequest<never, AccessTokenResponse>({
    method: EHttpMethod.GET,
    url: `${BASE_URL}/sessions`,
  });
};

export const googleSignup = async () => {
  window.location.href = "http://localhost:3000/auth/oauth/google";
};
