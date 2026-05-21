import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type WeekStartsOn = "monday" | "sunday";

export type Preferences = {
  currency: string;
  weekStartsOn: WeekStartsOn;
  defaultAppointmentMinutes: number;
  appointmentRemindersEnabled: boolean;
};

const DEFAULT_PREFERENCES: Preferences = {
  currency: "EUR",
  weekStartsOn: "monday",
  defaultAppointmentMinutes: 60,
  appointmentRemindersEnabled: true,
};

type PreferencesState = Preferences & {
  setCurrency: (currency: string) => void;
  setWeekStartsOn: (weekStartsOn: WeekStartsOn) => void;
  setDefaultAppointmentMinutes: (minutes: number) => void;
  setAppointmentRemindersEnabled: (enabled: boolean) => void;
  resetPreferences: () => void;
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...DEFAULT_PREFERENCES,
      setCurrency: (currency) => set({ currency }),
      setWeekStartsOn: (weekStartsOn) => set({ weekStartsOn }),
      setDefaultAppointmentMinutes: (defaultAppointmentMinutes) =>
        set({ defaultAppointmentMinutes }),
      setAppointmentRemindersEnabled: (appointmentRemindersEnabled) =>
        set({ appointmentRemindersEnabled }),
      resetPreferences: () => set({ ...DEFAULT_PREFERENCES }),
    }),
    {
      name: "appointly.preferences",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
