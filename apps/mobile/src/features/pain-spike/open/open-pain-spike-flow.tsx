import { createContext, useContext, useMemo } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';

import type {
  BodyRegionId,
  EpisodeStartPreset,
  PainIntensityId,
  PainTypeId,
  TriggerId,
} from '@painlink/shared';

export type OpenPainSpikeFormValues = {
  intensity: PainIntensityId | null;
  types: PainTypeId[];

  radiates: boolean | null;
  radiationZones: BodyRegionId[];

  episodeStart: EpisodeStartPreset;
  trigger: TriggerId;

  note: string;
};

type Ctx = {
  form: UseFormReturn<OpenPainSpikeFormValues>;
};

export type OpenPainSpikeForm = UseFormReturn<OpenPainSpikeFormValues>;

const OpenPainSpikeFlowContext = createContext<Ctx | null>(null);

export const OpenPainSpikeFlowProvider = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<OpenPainSpikeFormValues>({
    defaultValues: {
      intensity: null,
      types: [],

      radiates: null,
      radiationZones: [],

      episodeStart: 'NOW',
      trigger: 'UNKNOWN',

      note: '',
    },
    mode: 'onChange',
  });

  const value = useMemo(() => ({ form }), [form]);

  return (
    <OpenPainSpikeFlowContext.Provider value={value}>{children}</OpenPainSpikeFlowContext.Provider>
  );
};

export const useOpenPainSpikeFlow = () => {
  const ctx = useContext(OpenPainSpikeFlowContext);
  if (!ctx) throw new Error('useOpenPainSpikeFlow must be used within OpenPainSpikeFlowProvider');
  return ctx;
};
