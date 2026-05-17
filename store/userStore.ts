import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { UserProfile } from "@/types/user";

type UserState = {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  clearProfile: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      updateProfile: (patch) =>
        set((state) =>
          state.profile
            ? {
                profile: {
                  ...state.profile,
                  ...patch,
                  updatedAt: new Date().toISOString(),
                },
              }
            : state,
        ),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: "appointly.user",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
