import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';

export type AuthField = 'email' | 'password' | 'name' | 'confirmPassword';

type UiAction =
  | { type: 'field'; field: AuthField; message: string }
  | { type: 'global'; message: string };

export type AuthClientErrorLike = {
  code?: string;
  message?: string;
};

const CODE_TO_ACTION: Record<string, UiAction> = {
  // Sign in
  INVALID_EMAIL_OR_PASSWORD: {
    type: 'field',
    field: 'password',
    message: 'Email ou mot de passe incorrect.',
  },
  INVALID_CREDENTIALS: {
    type: 'field',
    field: 'password',
    message: 'Email ou mot de passe incorrect.',
  },
  EMAIL_NOT_VERIFIED: {
    type: 'field',
    field: 'email',
    message: 'Email non vérifié. Vérifie ta boîte mail.',
  },

  // Sign up
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
    type: 'field',
    field: 'email',
    message: 'Cet email est déjà utilisé.',
  },

  // Reset / forgot
  INVALID_TOKEN: { type: 'global', message: 'Lien invalide ou expiré. Redemande un nouveau lien.' },
  TOKEN_EXPIRED: { type: 'global', message: 'Lien expiré. Redemande un nouveau lien.' },

  // Other
  TOO_MANY_REQUESTS: {
    type: 'global',
    message: 'Trop de tentatives. Réessaie dans quelques minutes.',
  },
};

export const mapAuthError = (error: AuthClientErrorLike): UiAction => {
  const code = error.code ?? 'UNKNOWN';
  const mapped = CODE_TO_ACTION[code];

  if (mapped) return mapped;

  return {
    type: 'global',
    message: error.message || 'Une erreur est survenue. Réessaie.',
  };
};

export const applyAuthError = <TValues extends FieldValues>(opts: {
  error: AuthClientErrorLike;
  setError?: UseFormSetError<TValues>;
  setServerError: (msg: string | null) => void;
}) => {
  const action = mapAuthError(opts.error);

  if (action.type === 'field' && opts.setError) {
    opts.setError(action.field as Path<TValues>, {
      type: 'server',
      message: action.message,
    });
    return;
  }

  opts.setServerError(action.message);
};

export const toNetworkErrorMessage = (err: unknown) => {
  const msg = err instanceof Error ? err.message : String(err);

  // React Native / fetch
  if (msg.includes('Network request failed')) {
    return 'Pas de connexion internet. Vérifie ton réseau et réessaie.';
  }

  // AbortController / timeouts (si un jour tu ajoutes)
  if (msg.includes('AbortError') || msg.toLowerCase().includes('timeout')) {
    return 'Le service met trop de temps à répondre. Réessaie.';
  }

  // TLS / DNS / autres cas fréquents
  if (msg.toLowerCase().includes('ssl') || msg.toLowerCase().includes('certificate')) {
    return 'Problème de connexion sécurisée. Réessaie ou change de réseau.';
  }

  return 'Impossible de contacter le serveur. Réessaie.';
};
