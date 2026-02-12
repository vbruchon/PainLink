import React from 'react';
import { useFormContext, type FieldValues } from 'react-hook-form';

import { Button } from '../button';

type Props = {
  children: string;
  className?: string;
};

export function SubmitButton<T extends FieldValues>({ children, className }: Props) {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext<T>();

  return (
    <Button
      className={className}
      size="lg"
      loading={isSubmitting}
      disabled={!isValid || isSubmitting}
    >
      {children}
    </Button>
  );
}
