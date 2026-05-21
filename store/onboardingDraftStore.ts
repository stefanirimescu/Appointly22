import { create } from "zustand";
import type { Availability } from "@/types/availability";

export type ServiceDraft = {
  name: string;
  duration: number;
  price: number;
};

type OnboardingDraftState = {
  profession: string | null;
  businessName: string;
  service: ServiceDraft | null;
  availability: Availability | null;
  setProfession: (profession: string) => void;
  setBusinessName: (businessName: string) => void;
  setService: (service: ServiceDraft) => void;
  setAvailability: (availability: Availability) => void;
  reset: () => void;
};

const initialState = {
  profession: null,
  businessName: "",
  service: null,
  availability: null,
};

export const useOnboardingDraft = create<OnboardingDraftState>((set) => ({
  ...initialState,
  setProfession: (profession) => set({ profession }),
  setBusinessName: (businessName) => set({ businessName }),
  setService: (service) => set({ service }),
  setAvailability: (availability) => set({ availability }),
  reset: () => set(initialState),
}));
