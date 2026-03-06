import { useState } from 'react';
import { useRouter } from 'expo-router';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { openPainSpike } from '@/lib/pain/pain-spike-api';
import { goSuccessScreen } from '@/features/feedback/variants/navigation';
import { mapOpenPainSpike } from '@/features/pain-spike/open/mappers';
import { hapticWarning } from '@/lib/haptics/haptics';
import { handleOpenPainSpikeError } from '../errors/handle-pain-spike-error';
import { useGuardOpenPainSpike } from '../hooks/use-guard-open-pain-spike';
import { OpenPainSpikeFormValues } from '../open/open-pain-spike-flow';

type Step = 'INTENSITY' | 'TYPES' | 'RADIATION' | 'DETAILS';

const STEPS: Step[] = ['INTENSITY', 'TYPES', 'RADIATION', 'DETAILS'];

export function usePainSpikeController(form: UseFormReturn<OpenPainSpikeFormValues>) {
  const router = useRouter();

  const { isChecking } = useGuardOpenPainSpike();
  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const step = STEPS[stepIndex];

  const goNext = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  const goPrev = () => setStepIndex((i) => Math.max(i - 1, 0));

  const quitToHome = () => router.replace('/(tabs)');

  const intensity = useWatch({ control: form.control, name: 'intensity' });
  const types = useWatch({ control: form.control, name: 'types' });
  const radiates = useWatch({ control: form.control, name: 'radiates' });
  const radiationZones = useWatch({ control: form.control, name: 'radiationZones' });

  const canContinueForStep = () => {
    switch (step) {
      case 'INTENSITY':
        return !!intensity;

      case 'TYPES':
        return (types ?? []).length > 0;

      case 'RADIATION':
        return radiates !== true || (radiationZones ?? []).length > 0;

      case 'DETAILS':
      default:
        return true;
    }
  };

  const canContinue = canContinueForStep();

  const primaryLabel = step === 'DETAILS' ? 'Ouvrir le pic' : 'Continuer';

  const onPickZones = () => {
    form.clearErrors('radiationZones');
    router.push('/(user-action)/open-pain-spike/propagation-zones');
  };

  const handlePrimaryAction = async () => {
    if (isSubmitting) return;

    if (step === 'INTENSITY' || step === 'TYPES') {
      return goNext();
    }

    if (step === 'RADIATION') {
      const r = form.getValues('radiates');
      const zones = form.getValues('radiationZones') ?? [];

      if (r === true && zones.length === 0) {
        hapticWarning();

        form.setError('radiationZones', {
          type: 'validate',
          message: 'Choisis au moins une zone.',
        });
        return;
      }

      return goNext();
    }

    const payload = mapOpenPainSpike(form.getValues());

    try {
      setIsSubmitting(true);

      await openPainSpike(payload);

      goSuccessScreen('open-pain-spike');
    } catch (error) {
      handleOpenPainSpikeError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const leftAction =
    step === 'INTENSITY'
      ? { label: 'Quitter', onPress: quitToHome, variant: 'outline' as const }
      : { label: 'Précédent', onPress: goPrev, variant: 'outline' as const };

  return {
    isChecking,
    step,
    stepIndex,
    isSubmitting,
    canContinue,
    primaryLabel,
    leftAction,
    handlePrimaryAction,
    onPickZones,
  };
}
