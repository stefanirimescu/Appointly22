import { Calendar } from "lucide-react-native";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";

export default function CalendarScreen() {
  return (
    <ScreenContainer>
      <SectionHeader title="Calendar" subtitle="Your upcoming appointments." />
      <EmptyState
        icon={Calendar}
        title="No appointments yet"
        description="Add a booking to see your schedule come to life."
      />
    </ScreenContainer>
  );
}
