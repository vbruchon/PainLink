import { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import * as Linking from 'expo-linking';

import { Text } from '../ui/text';
import { Button } from '../ui/button';
import { Form } from '../ui/form/form';
import { FormField } from '../ui/form/form-field';

import { authClient } from '@/lib/auth/auth-client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@painlink/shared';
import { applyAuthError, toNetworkErrorMessage } from '@/lib/auth/error-mapping';

export const ForgotPasswordForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const emailRef = useRef<TextInput>(null);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    clearErrors,
    setError,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (values: ForgotPasswordInput) => {
    setServerError(null);

    const redirectTo = Linking.createURL('/reset-password');
    const payload = forgotPasswordSchema.parse(values);

    try {
      const res = await authClient.requestPasswordReset({
        email: payload.email,
        redirectTo,
      });

      if (res.error) {
        applyAuthError({ error: res.error, setError, setServerError });
        return;
      }
    } catch (e) {
      setServerError(toNetworkErrorMessage(e));
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <View className="gap-3">
        <Text variant="body" className="text-primary font-semibold">
          Email envoyé ✅
        </Text>
        <Text variant="body" className="text-muted">
          Regarde ta boîte mail (et tes spams). Le lien t’ouvrira PainLink pour choisir un nouveau
          mot de passe.
        </Text>
      </View>
    );
  }

  return (
    <Form form={form}>
      <View className="gap-3">
        <FormField
          control={form.control}
          name="email"
          label="Email :"
          placeholder="example@email.com"
          inputRef={emailRef}
          debounceClearErrorMs={250}
          onClearError={() => {
            clearErrors('email');
            setServerError(null);
          }}
          inputProps={{
            keyboardType: 'email-address',
            autoCapitalize: 'none',
            autoCorrect: false,

            textContentType: 'emailAddress',
            autoComplete: 'email',

            returnKeyType: 'done',
            blurOnSubmit: true,
            onSubmitEditing: handleSubmit(onSubmit),
          }}
        />

        {serverError ? (
          <Text variant="caption" className="!text-destructive">
            {serverError}
          </Text>
        ) : null}

        <Button
          className="mt-4"
          size="lg"
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          Envoyer le lien
        </Button>
      </View>
    </Form>
  );
};
