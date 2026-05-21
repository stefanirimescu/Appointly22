import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Client } from "@/types/client";

type ClientState = {
  clients: Client[];
  addClient: (client: Client) => void;
  updateClient: (id: string, patch: Partial<Client>) => void;
  removeClient: (id: string) => void;
  getClient: (id: string) => Client | undefined;
  reset: () => void;
};

export const useClientStore = create<ClientState>()(
  persist(
    (set, get) => ({
      clients: [],
      addClient: (client) =>
        set((state) => ({ clients: [...state.clients, client] })),
      updateClient: (id, patch) =>
        set((state) => ({
          clients: state.clients.map((c) =>
            c.id === id
              ? { ...c, ...patch, updatedAt: new Date().toISOString() }
              : c,
          ),
        })),
      removeClient: (id) =>
        set((state) => ({
          clients: state.clients.filter((c) => c.id !== id),
        })),
      getClient: (id) => get().clients.find((c) => c.id === id),
      reset: () => set({ clients: [] }),
    }),
    {
      name: "appointly.clients",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
