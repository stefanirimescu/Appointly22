import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Availability, AvailabilityDay, WeekDay } from "@/types/availability";

type AvailabilityState = {
  availability: Availability | null;
  setAvailability: (availability: Availability) => void;
  updateDay: (day: WeekDay, patch: Partial<AvailabilityDay>) => void;
  clearAvailability: () => void;
};

export const useAvailabilityStore = create<AvailabilityState>()(
  persist(
    (set) => ({
      availability: null,
      setAvailability: (availability) => set({ availability }),
      updateDay: (day, patch) =>
        set((state) =>
          state.availability
            ? {
                availability: {
                  days: state.availability.days.map((d) =>
                    d.day === day ? { ...d, ...patch } : d,
                  ),
                },
              }
            : state,
        ),
      clearAvailability: () => set({ availability: null }),
    }),
    {
      name: "appointly.availability",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
