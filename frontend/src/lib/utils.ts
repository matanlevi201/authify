import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class Notifications {
  static errors(errors: { message: string }[]) {
    errors.forEach((error) => toast(error.message));
  }

  static success(message: string) {
    toast(message, { className: "border-2 text-red-500" });
  }
}

export class Tokens {
  static parseJWT(token: string) {
    const payload = token.split(".")[1];
    if (!payload) return;
    const decodedPayload = atob(payload);
    const data = JSON.parse(decodedPayload);
    if (Tokens.isExpired(data?.exp)) return;
    return data;
  }

  static isExpired(exp: number) {
    const currentTime = Math.floor(Date.now() / 1000);
    return exp <= currentTime;
  }

  static resolveCookie(key: string) {
    const regex = new RegExp(`${key}=([^;]*)`);
    const match = document.cookie.match(regex);
    return match?.[1] ?? "";
  }
}
