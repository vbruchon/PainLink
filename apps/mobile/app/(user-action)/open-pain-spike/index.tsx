import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Form } from '@/components/ui/form/form';
import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/ui/header';
import { FlowFooter } from '@/components/ui/flow/flow-footer';
import { StepIndicator } from '@/components/ui/flow/step-indicator';

import { IntensityStep } from '@/features/pain-spike/open/steps/intensity-step';
import { TypesStep } from '@/features/pain-spike/open/steps/types-step';
import { RadiationZonesStep } from '@/features/pain-spike/open/steps/radiation-zone-step';
import { DetailsStep } from '@/features/pain-spike/open/steps/details-step';

import { useOpenPainSpikeFlow } from '@/features/pain-spike/open/open-pain-spike-flow';
import { usePainSpikeController } from '@/features/pain-spike/controller/use-pain-spike-controller';

export default function OpenPainSpikeScreen() {
  const insets = useSafeAreaInsets();

  const { form } = useOpenPainSpikeFlow();

  const {
    step,
    stepIndex,
    isSubmitting,
    canContinue,
    primaryLabel,
    leftAction,
    handlePrimaryAction,
    onPickZones,
  } = usePainSpikeController(form);

  const renderStep = () => {
    switch (step) {
      case 'INTENSITY':
        return <IntensityStep form={form} />;

      case 'TYPES':
        return <TypesStep form={form} />;

      case 'RADIATION':
        return <RadiationZonesStep form={form} onPickZones={onPickZones} />;

      case 'DETAILS':
      default:
        return <DetailsStep form={form} />;
    }
  };

  return (
    <Screen>
      <Header title="Ajouter un pic de douleur" />

      <StepIndicator step={stepIndex + 1} total={4} />

      <Form form={form}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View className="flex-1 relative">
            <KeyboardAwareScrollView
              className="flex-1"
              enableOnAndroid
              keyboardShouldPersistTaps="handled"
              extraScrollHeight={0}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 16,
                paddingBottom: 120 + Math.max(insets.bottom, 16),
              }}
            >
              <View className="px-5">{renderStep()}</View>
            </KeyboardAwareScrollView>

            <FlowFooter
              left={leftAction}
              primary={{
                label: primaryLabel,
                onPress: handlePrimaryAction,
                disabled: !canContinue || isSubmitting,
                loading: isSubmitting,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </Form>
    </Screen>
  );
}
