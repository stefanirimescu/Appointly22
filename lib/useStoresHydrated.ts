import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useServiceStore } from "@/store/serviceStore";
import { useClientStore } from "@/store/clientStore";
import { useAppointmentStore } from "@/store/appointmentStore";
import { useAvailabilityStore } from "@/store/availabilityStore";
import { usePreferencesStore } from "@/store/preferencesStore";

const PERSISTED_STORES = [
  useUserStore,
  useServiceStore,
  useClientStore,
  useAppointmentStore,
  useAvailabilityStore,
  usePreferencesStore,
] as const;

export function useStoresHydrated(): boolean {
  const [allHydrated, setAllHydrated] = useState(() =>
    PERSISTED_STORES.every((s) => s.persist.hasHydrated()),
  );

  useEffect(() => {
    if (allHydrated) return;

    const check = () =>
      setAllHydrated(PERSISTED_STORES.every((s) => s.persist.hasHydrated()));

    check();
    const unsubs = PERSISTED_STORES.map((s) =>
      s.persist.onFinishHydration(check),
    );

    return () => {
      unsubs.forEach((u) => u());
    };
  }, [allHydrated]);

  return allHydrated;
}
