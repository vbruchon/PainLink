import { Stack } from 'expo-router';
import { OpenPainSpikeFlowProvider } from '@/features/pain-spike/open/open-pain-spike-flow';

export default function OpenPainSpikeLayout() {
  return (
    <OpenPainSpikeFlowProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="propagation-zones" options={{ presentation: 'modal' }} />
      </Stack>
    </OpenPainSpikeFlowProvider>
  );
}
