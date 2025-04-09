import { makeRequest } from "@/api/make-request";
import { EHttpMethod } from "@/types";

type AccessTokenResponse = {
  accessToken: string;
};
export type Generate2faQrResponse = {
  secret: string;
  qr: string;
};
export type TFAToken = {
  token: string;
};

const BASE_URL = "/api/2fa";

export const generate2faQr = async () => {
  return await makeRequest<never, Generate2faQrResponse>({
    method: EHttpMethod.GET,
    url: BASE_URL,
  });
};

export const enable2fa = async (token: string) => {
  return await makeRequest<TFAToken, AccessTokenResponse>({
    method: EHttpMethod.POST,
    url: BASE_URL,
    body: { token },
  });
};

export const verify2fa = async (token: string) => {
  return await makeRequest<TFAToken, AccessTokenResponse>({
    method: EHttpMethod.POST,
    url: `${BASE_URL}/verify`,
    body: { token },
  });
};

export const disable2fa = async (token: string) => {
  return await makeRequest<TFAToken, AccessTokenResponse>({
    method: EHttpMethod.DELETE,
    url: BASE_URL,
    body: { token },
  });
};
