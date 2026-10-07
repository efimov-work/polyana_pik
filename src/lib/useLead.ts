'use client';

import { useCallback, useState } from 'react';
import { isPhone } from './contact';
import { CONTACTS } from './content';

export type LeadStatus = 'idle' | 'sending' | 'success' | 'error';

export type LeadFields = {
  form: 'hero' | 'agent';
  phone: string;
  name?: string;
  purpose?: string;
  interest?: string;
  website?: string;
};

export function useLead() {
  const [status, setStatus] = useState<LeadStatus>('idle');
  const [error, setError] = useState('');

  const send = useCallback(
    async (fields: LeadFields): Promise<boolean> => {
      if (status === 'sending') return false;

      if (!isPhone(fields.phone)) {
        setError('Укажите номер телефона полностью');
        setStatus('error');
        return false;
      }

      setError('');
      setStatus('sending');
      try {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields)
        });
        if (res.status === 429) {
          setError(`Слишком много заявок с этого номера. Позвоните нам: ${CONTACTS.phone}`);
          setStatus('error');
          return false;
        }
        if (!res.ok) throw new Error('request failed');
        setStatus('success');
        return true;
      } catch {
        setError(`Не удалось отправить. Позвоните нам: ${CONTACTS.phone}`);
        setStatus('error');
        return false;
      }
    },
    [status]
  );

  return { status, error, send };
}
