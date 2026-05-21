import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Appointment, AppointmentStatus } from "@/types/appointment";

type AppointmentState = {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, patch: Partial<Appointment>) => void;
  setStatus: (id: string, status: AppointmentStatus) => void;
  removeAppointment: (id: string) => void;
  getAppointment: (id: string) => Appointment | undefined;
  reset: () => void;
};

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set, get) => ({
      appointments: [],
      addAppointment: (appointment) =>
        set((state) => ({
          appointments: [...state.appointments, appointment],
        })),
      updateAppointment: (id, patch) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id
              ? { ...a, ...patch, updatedAt: new Date().toISOString() }
              : a,
          ),
        })),
      setStatus: (id, status) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id
              ? { ...a, status, updatedAt: new Date().toISOString() }
              : a,
          ),
        })),
      removeAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.filter((a) => a.id !== id),
        })),
      getAppointment: (id) => get().appointments.find((a) => a.id === id),
      reset: () => set({ appointments: [] }),
    }),
    {
      name: "appointly.appointments",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
