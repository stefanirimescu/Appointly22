import { Users } from "lucide-react-native";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ClientsScreen() {
  return (
    <ScreenContainer>
      <SectionHeader title="Clients" subtitle="People you book with." />
      <EmptyState
        icon={Users}
        title="No clients yet"
        description="Add your first client to keep their details and appointment history in one place."
      />
    </ScreenContainer>
  );
}
