import { useMemo, useState } from 'react';
import { SectionList, Pressable, View, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useOpenPainSpikeFlow } from '@/features/pain-spike/open/open-pain-spike-flow';
import type { BodyRegionId, SectionKey } from '@painlink/shared';
import { BODY_REGION_IDS, BODY_REGION_LABEL, getSectionKey, sectionTitle } from '@painlink/shared';
import { useUser } from '@/hooks/use-user';
import { useWatch } from 'react-hook-form';
import { clsx } from 'clsx';
import { hapticSelection } from '@/lib/haptics/haptics';

export default function PropagationZonesModal() {
  const { user } = useUser();
  const { form } = useOpenPainSpikeFlow();
  const selected = useWatch({ control: form.control, name: 'radiationZones' }) ?? [];

  const selectedCount = selected.length;

  const toggle = (id: BodyRegionId) => {
    if (id === user?.mainPainZone) return;

    hapticSelection();

    const current = form.getValues('radiationZones') ?? [];
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];

    form.setValue('radiationZones', next, { shouldValidate: true, shouldDirty: true });
  };

  const clear = () => {
    hapticSelection();
    form.setValue('radiationZones', [], { shouldValidate: true, shouldDirty: true });
  };

  const subtitle = useMemo(() => {
    if (!selectedCount) return 'Aucune zone sélectionnée';
    if (selectedCount === 1) return '1 zone sélectionnée';
    return `${selectedCount} zones sélectionnées`;
  }, [selectedCount]);

  const sections = useMemo(() => {
    const groups = new Map<SectionKey, BodyRegionId[]>();

    for (const id of BODY_REGION_IDS) {
      const k = getSectionKey(id);
      const arr = groups.get(k) ?? [];
      arr.push(id);
      groups.set(k, arr);
    }

    const order: SectionKey[] = ['TETE', 'BRAS', 'TRONC', 'JAMBES', 'AUTRE'];

    return order
      .filter((k) => (groups.get(k)?.length ?? 0) > 0)
      .map((k) => ({ title: sectionTitle[k], data: groups.get(k)! }));
  }, []);

  const [query, setQuery] = useState('');

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;

    return sections
      .map((s) => ({
        ...s,
        data: s.data.filter((id) =>
          (BODY_REGION_LABEL[id] ?? String(id)).toLowerCase().includes(q),
        ),
      }))
      .filter((s) => s.data.length > 0);
  }, [query, sections]);

  return (
    <View className="flex-1 bg-white px-5 pt-6">
      <View className="gap-1">
        <Text variant="h3">Zones de propagation</Text>
        <Text variant="body">{subtitle}</Text>
      </View>

      <View className="mt-4 rounded-2xl border border-muted/20 bg-white px-4 py-3">
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Rechercher une zone…"
          placeholderTextColor="#94a3b8"
        />
      </View>

      <View className="mt-6 flex-1">
        <SectionList
          sections={filteredSections}
          extraData={selected}
          keyExtractor={(id) => id}
          keyboardShouldPersistTaps="handled"
          stickySectionHeadersEnabled
          contentContainerStyle={{ paddingBottom: 24 }}
          renderSectionHeader={({ section }) => (
            <View className="pb-2 pt-4 bg-white">
              <Text variant="strong" className="text-sm">
                {section.title}
              </Text>
            </View>
          )}
          renderItem={({ item: id }) => {
            const isOn = selected.includes(id);
            const isLocked = id === user?.mainPainZone;
            const handleToggle = () => toggle(id);

            return (
              <ZoneRow
                label={BODY_REGION_LABEL[id] ?? id}
                locked={isLocked}
                selected={isOn}
                onPress={handleToggle}
              />
            );
          }}
        />
      </View>

      <View className="gap-3 pb-8">
        <Button
          onPress={() => {
            hapticSelection();
            router.back();
          }}
        >
          Enregistrer
        </Button>

        <View className="flex-row items-center justify-between">
          <Pressable onPress={clear} className="px-2 py-2">
            <Text>Effacer</Text>
          </Pressable>

          <Pressable onPress={() => router.back()} className="px-2 py-2">
            <Text>Annuler</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const ZoneRow = ({
  label,
  locked,
  selected,
  onPress,
}: {
  label: string;
  locked?: boolean;
  selected: boolean;
  onPress?: () => void;
}) => {
  const handlePress = () => {
    hapticSelection();
    if (onPress) onPress();
  };
  return (
    <Pressable
      onPress={locked ? undefined : handlePress}
      disabled={locked}
      className={clsx(
        'mb-3 rounded-2xl border px-4 py-4',
        locked && 'border-muted/20 bg-slate-100 opacity-60',
        !locked && selected && 'border-secondary/70 bg-slate-50',
        !locked && !selected && 'border-muted/20 bg-white',
      )}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text variant="strong">{label}</Text>
          {locked ? (
            <Text variant="caption" className="mt-1">
              Zone principale
            </Text>
          ) : null}
        </View>

        <View
          className={clsx(
            'h-5 w-5 rounded-full border',
            selected ? 'border-secondary bg-secondary' : 'border-muted/50 bg-white',
          )}
        />
      </View>
    </Pressable>
  );
};
