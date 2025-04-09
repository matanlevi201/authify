import { Tokens } from "@/lib/utils";
import { CurrentUser } from "common";
import { create } from "zustand";

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
