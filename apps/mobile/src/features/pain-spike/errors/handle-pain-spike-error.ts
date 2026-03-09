import { goNetworkErrorScreen } from '@/features/feedback/variants/navigation';
import { ApiError } from '@/lib/api/api-error';
import { Alert } from 'react-native';

export function handleOpenPainSpikeError(err: unknown) {
  if (err instanceof ApiError) {
    if (err.code === 'PAIN_SPIKE_ALREADY_OPEN') {
      Alert.alert(
        'Pic déjà ouvert',
        'Un pic est déjà en cours. Ferme-le avant d’en ouvrir un autre.',
      );
      return;
    }

    if (err.code === 'INVALID_DATA') {
      Alert.alert(
        'Données à vérifier',
        'Certaines informations ne sont pas valides. Vérifie les champs et réessaie.',
      );
      return;
    }

    if (err.status === 401) {
      Alert.alert('Session expirée', 'Ta session a expiré. Reconnecte-toi puis réessaie.');
      return;
    }

    if (err.code === 'INTERNAL_SERVER_ERROR' || err.status >= 500) {
      Alert.alert(
        'Erreur serveur',
        "Une erreur s'est produite côté serveur. Réessaie dans quelques instants.",
      );
      return;
    }
  }

  if (err instanceof TypeError) {
    goNetworkErrorScreen('/(user-action)/open-pain-spike');
    return;
  }

  Alert.alert('Erreur', "Le pic n'a pas pu être enregistré. Réessaie dans quelques instants.");
}
