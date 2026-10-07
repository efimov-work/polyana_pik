'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { PURPOSES } from '@/lib/content';
import { INTEREST_EVENT } from '@/lib/interest';
import { useLead } from '@/lib/useLead';
import PhoneInput from './PhoneInput';

export default function AgentForm() {
  const { status, error, send } = useLead();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState<string>(PURPOSES[0]);
  const [interest, setInterest] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    const onInterest = (e: Event) => setInterest((e as CustomEvent<string>).detail || '');
    window.addEventListener(INTEREST_EVENT, onInterest);
    return () => window.removeEventListener(INTEREST_EVENT, onInterest);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send({ form: 'agent', name, phone, purpose, interest, website });
  };

  if (status === 'success') {
    return (
      <div className="form-done" role="status">
        <div style={{ fontFamily: 'var(--fd)', fontSize: 32, lineHeight: 1.1 }}>Заявка принята</div>
        <div style={{ marginTop: 16, fontSize: 16, lineHeight: 1.55, color: '#B9BFB9' }}>
          Свяжемся по номеру {phone}, пришлём прайс и расчёт дохода.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} aria-busy={status === 'sending'} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontFamily: 'var(--fd)', fontSize: 32, lineHeight: 1.1, marginBottom: 8 }}>Пришлём прайс и расчёт дохода</div>
      {interest ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontSize: 14, lineHeight: 1.4, color: '#F0B07E' }}>
          <span>{interest}</span>
          <button
            type="button"
            aria-label="Убрать планировку из заявки"
            onClick={() => setInterest('')}
            style={{ border: 0, background: 'none', color: '#8E958F', fontSize: 20, lineHeight: 1, cursor: 'pointer', padding: 4 }}
          >
            ×
          </button>
        </div>
      ) : null}
      <input
        className="input"
        name="name"
        aria-label="Имя"
        placeholder="Имя"
        autoComplete="name"
        maxLength={200}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <PhoneInput className="input" label="Телефон" placeholder="Телефон" value={phone} onChange={setPhone} />
      <div role="group" aria-label="Цель покупки" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 13, fontWeight: 600 }}>
        {PURPOSES.map((p) => {
          const active = p === purpose;
          return (
            <button
              key={p}
              type="button"
              className="chip"
              aria-pressed={active}
              onClick={() => setPurpose(p)}
              style={{
                padding: '10px 16px',
                borderRadius: 30,
                fontSize: 13,
                background: active ? '#F4F1EC' : 'transparent',
                color: active ? '#0E1311' : '#F4F1EC',
                borderColor: active ? '#F4F1EC' : 'rgba(244,241,236,.25)'
              }}
            >
              {p}
            </button>
          );
        })}
      </div>
      <label className="hp" aria-hidden="true">
        <span>Сайт</span>
        <input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </label>
      <button type="submit" className="submit" disabled={status === 'sending'} style={{ marginTop: 8 }}>
        {status === 'sending' ? 'Отправляем...' : 'Получить расчёт'}
      </button>
      {status === 'error' && error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <div style={{ fontSize: 12, color: '#8E958F', lineHeight: 1.5 }}>
        Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
      </div>
    </form>
  );
}
