import { BarChart3 } from "lucide-react-native";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ReportsScreen() {
  return (
    <ScreenContainer>
      <SectionHeader
        title="Reports"
        subtitle="Your revenue and performance at a glance."
      />
      <EmptyState
        icon={BarChart3}
        title="Nothing to report yet"
        description="Complete a few appointments and your revenue will appear here."
      />
    </ScreenContainer>
  );
}
