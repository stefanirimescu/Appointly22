import { Text, View } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: Props) {
  return (
    <View className="mb-6">
      <Text className="text-3xl font-bold text-ink-primary">{title}</Text>
      {subtitle ? (
        <Text className="mt-1 text-base text-ink-secondary">{subtitle}</Text>
      ) : null}
    </View>
  );
}
