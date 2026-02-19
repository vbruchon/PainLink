import { useMemo, useRef, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SelectedChip } from './selected-chip';

type Props = {
  open: boolean;
  label: string | null;
  onClear: () => void;
  onSave: () => void;
  error: string | null;
  isSaving?: boolean;
};

export const BodySelectionSheet = ({
  open,
  label,
  onClear,
  onSave,
  error,
  isSaving = false,
}: Props) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%'], []);
  const insets = useSafeAreaInsets();
  const bottomPadding = 32 + insets.bottom;

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (open) sheetRef.current?.snapToIndex(0);
      else sheetRef.current?.close();
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  const handleClear = useCallback(() => {
    sheetRef.current?.close();
    requestAnimationFrame(() => onClear());
  }, [onClear]);

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === -1 && label) onClear();
    },
    [label, onClear],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      animateOnMount={false}
      onChange={handleSheetChange}
      detached
      backgroundStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: 'white',
      }}
      handleIndicatorStyle={{
        backgroundColor: '#ccc',
        width: 40,
      }}
    >
      <BottomSheetView className="px-6 pt-2 gap-3" style={{ paddingBottom: bottomPadding }}>
        <View className="flex-row gap-3 items-center">
          <Text variant="small" className="italic">
            Zone sélectionnée
          </Text>

          {error ? (
            <Text variant="caption" className="text-destructive">
              {error}
            </Text>
          ) : null}
        </View>

        {label ? (
          <SelectedChip label={label} onClear={handleClear} />
        ) : (
          <Text className="text-sm opacity-60">Aucune zone</Text>
        )}

        <View className="flex-row gap-3 mt-2">
          <Button variant="secondary" className="flex-1" onPress={handleClear}>
            Effacer
          </Button>

          <Button className="flex-1" onPress={onSave} disabled={!label} loading={isSaving}>
            Enregistrer
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
