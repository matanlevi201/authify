import { Tokens } from "@/lib/utils";
import { create } from "zustand";

type CurrentUser = {
  id: number;
  email: string;
  is2FAEnabled: boolean;
  is2FAVerified: boolean;
  isOauth2User: boolean;
};
interface SessionState {
  accessToken: string | null;
  currentUser: CurrentUser | null;
  setSession: (accessToken: string) => void;
  endSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  accessToken: null,
  currentUser: null,
  setSession: (accessToken) =>
    set(() => ({ accessToken, currentUser: Tokens.parseJWT(accessToken) })),
  endSession: () => set(() => ({ accessToken: null, currentUser: null })),
}));
