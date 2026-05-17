import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Service } from "@/types/service";

type ServiceState = {
  services: Service[];
  addService: (service: Service) => void;
  updateService: (id: string, patch: Partial<Service>) => void;
  removeService: (id: string) => void;
  getService: (id: string) => Service | undefined;
};

export const useServiceStore = create<ServiceState>()(
  persist(
    (set, get) => ({
      services: [],
      addService: (service) =>
        set((state) => ({ services: [...state.services, service] })),
      updateService: (id, patch) =>
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id
              ? { ...s, ...patch, updatedAt: new Date().toISOString() }
              : s,
          ),
        })),
      removeService: (id) =>
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
        })),
      getService: (id) => get().services.find((s) => s.id === id),
    }),
    {
      name: "appointly.services",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
