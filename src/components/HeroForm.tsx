'use client';

import { useState, type CSSProperties, type FormEvent } from 'react';
import { useLead } from '@/lib/useLead';
import PhoneInput from './PhoneInput';

const card: CSSProperties = {
  justifySelf: 'end',
  width: '100%',
  maxWidth: 420,
  background: 'rgba(14,19,17,.72)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(244,241,236,.14)',
  borderRadius: 20,
  padding: 'clamp(20px,2.5vw,28px)',
  display: 'flex',
  flexDirection: 'column',
  gap: 14
};

const title: CSSProperties = { fontFamily: 'var(--fd)', fontSize: 'clamp(22px,2vw,26px)', lineHeight: 1.15 };

export default function HeroForm() {
  const { status, error, send } = useLead();
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send({ form: 'hero', phone, website });
  };

  if (status === 'success') {
    return (
      <div className="form-done" role="status" style={card}>
        <div style={title}>Заявка принята</div>
        <div style={{ fontSize: 15, lineHeight: 1.5, color: '#B9BFB9' }}>
          Пришлём свободные лоты и цены на номер {phone}.
        </div>
      </div>
    );
  }

  return (
    <form className="hero-in" onSubmit={onSubmit} aria-busy={status === 'sending'} noValidate style={{ ...card, ['--i' as string]: 4 }}>
      <div style={title}>Пришлём свободные лоты и цены в MAX</div>
      <PhoneInput className="input input--hero" label="Телефон" value={phone} onChange={setPhone} />
      <label className="hp" aria-hidden="true">
        <span>Сайт</span>
        <input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </label>
      <button type="submit" className="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Отправляем...' : 'Получить презентацию и цены'}
      </button>
      {status === 'error' && error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
