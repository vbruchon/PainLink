import { applyAuthError, mapAuthError, toNetworkErrorMessage } from '@/lib/auth/error-mapping';

describe('error-mapping', () => {
  describe('mapAuthError', () => {
    test('should map INVALID_CREDENTIALS to password field error', () => {
      expect(mapAuthError({ code: 'INVALID_CREDENTIALS' })).toEqual({
        type: 'field',
        field: 'password',
        message: 'Email ou mot de passe incorrect.',
      });
    });

    test('should map EMAIL_NOT_VERIFIED to email field error', () => {
      expect(mapAuthError({ code: 'EMAIL_NOT_VERIFIED' })).toEqual({
        type: 'field',
        field: 'email',
        message: 'Email non vérifié. Vérifie ta boîte mail.',
      });
    });

    test('should map TOO_MANY_REQUESTS to global error', () => {
      expect(mapAuthError({ code: 'TOO_MANY_REQUESTS' })).toEqual({
        type: 'global',
        message: 'Trop de tentatives. Réessaie dans quelques minutes.',
      });
    });

    test('should fallback to provided message for unknown codes', () => {
      expect(mapAuthError({ code: 'SOMETHING_NEW', message: 'Custom message' })).toEqual({
        type: 'global',
        message: 'Custom message',
      });
    });

    test('should fallback to default message when code and message are missing', () => {
      expect(mapAuthError({})).toEqual({
        type: 'global',
        message: 'Une erreur est survenue. Réessaie.',
      });
    });
  });

  describe('applyAuthError', () => {
    test('should call setError for field actions when setError is provided', () => {
      const setError = jest.fn();
      const setServerError = jest.fn();

      applyAuthError({
        error: { code: 'INVALID_EMAIL_OR_PASSWORD' },
        setError: setError as any,
        setServerError,
      });

      expect(setError).toHaveBeenCalledTimes(1);
      expect(setError).toHaveBeenCalledWith('password', {
        type: 'server',
        message: 'Email ou mot de passe incorrect.',
      });

      expect(setServerError).not.toHaveBeenCalled();
    });

    test('should call setServerError when action is global', () => {
      const setError = jest.fn();
      const setServerError = jest.fn();

      applyAuthError({
        error: { code: 'TOO_MANY_REQUESTS' },
        setError: setError as any,
        setServerError,
      });

      expect(setServerError).toHaveBeenCalledTimes(1);
      expect(setServerError).toHaveBeenCalledWith(
        'Trop de tentatives. Réessaie dans quelques minutes.',
      );

      expect(setError).not.toHaveBeenCalled();
    });

    test('should call setServerError when action is field but setError is missing', () => {
      const setServerError = jest.fn();

      applyAuthError({
        error: { code: 'EMAIL_NOT_VERIFIED' },
        setServerError,
      });

      expect(setServerError).toHaveBeenCalledTimes(1);
      expect(setServerError).toHaveBeenCalledWith('Email non vérifié. Vérifie ta boîte mail.');
    });
  });

  describe('toNetworkErrorMessage', () => {
    test('should return offline message for React Native fetch error', () => {
      expect(toNetworkErrorMessage(new Error('Network request failed'))).toBe(
        'Pas de connexion internet. Vérifie ton réseau et réessaie.',
      );
    });

    test('should return timeout message for AbortError', () => {
      expect(toNetworkErrorMessage(new Error('AbortError'))).toBe(
        'Le service met trop de temps à répondre. Réessaie.',
      );
    });

    test('should return timeout message when message contains "timeout"', () => {
      expect(toNetworkErrorMessage(new Error('Request timeout'))).toBe(
        'Le service met trop de temps à répondre. Réessaie.',
      );
    });

    test('should return TLS message for certificate errors', () => {
      expect(toNetworkErrorMessage(new Error('SSL certificate error'))).toBe(
        'Problème de connexion sécurisée. Réessaie ou change de réseau.',
      );
    });

    test('should return default server message for unknown network errors', () => {
      expect(toNetworkErrorMessage(new Error('Something else'))).toBe(
        'Impossible de contacter le serveur. Réessaie.',
      );
    });

    test('should handle non-Error values', () => {
      expect(toNetworkErrorMessage('Network request failed')).toBe(
        'Pas de connexion internet. Vérifie ton réseau et réessaie.',
      );
    });
  });
});
