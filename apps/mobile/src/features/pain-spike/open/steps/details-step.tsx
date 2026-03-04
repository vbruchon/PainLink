import type { OpenPainSpikeForm } from '@/features/pain-spike/open/open-pain-spike-flow';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { EpisodeStartField } from '../fields/episode-start-field';
import { TriggerField } from '../fields/trigger-field';
import { NoteField } from '../fields/note-field';

type Props = {
  form: OpenPainSpikeForm;
};

export const DetailsStep = ({ form }: Props) => {
  return (
    <View className="gap-8">
      <Section title="Début du pic" subtitle="À quel moment a-t-il commencé ?">
        <EpisodeStartField form={form} />
      </Section>

      <Section title="Déclencheur" subtitle="Qu’est-ce qui a pu déclencher ?">
        <TriggerField form={form} />
      </Section>

      <Section title="Note (optionnel)">
        <NoteField form={form} />
      </Section>
    </View>
  );
};

const Section = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => {
  return (
    <View className="gap-2">
      <View className="gap-2">
        <Text variant="strong">{title}</Text>
        {subtitle ? <Text>{subtitle}</Text> : null}
      </View>
      {children}
    </View>
  );
};
