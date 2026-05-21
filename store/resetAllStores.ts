import { useUserStore } from "@/store/userStore";
import { useServiceStore } from "@/store/serviceStore";
import { useClientStore } from "@/store/clientStore";
import { useAppointmentStore } from "@/store/appointmentStore";
import { useAvailabilityStore } from "@/store/availabilityStore";
import { usePreferencesStore } from "@/store/preferencesStore";

export function resetAllStores(): void {
  useUserStore.getState().clearProfile();
  useServiceStore.getState().reset();
  useClientStore.getState().reset();
  useAppointmentStore.getState().reset();
  useAvailabilityStore.getState().clearAvailability();
  usePreferencesStore.getState().resetPreferences();
}
