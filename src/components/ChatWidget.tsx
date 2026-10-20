'use client';

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { asset } from '@/lib/asset';
import { CHAT } from '@/lib/chat';
import { answer, topicById } from '@/lib/chatEngine';
import { CONTACTS } from '@/lib/content';

type Msg = { from: 'bot' | 'me'; text: string };

const T = CHAT.theme;
const SESSION_KEY = 'chat:session';
const TEASED_KEY = 'chat:teased';

function session(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = Math.random().toString(36).slice(2, 8);
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return 'anon';
  }
}

function forward(text: string, reply: string, phone: string) {
  fetch(asset('/api/chat'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session: session(), page: location.pathname + location.hash, text, reply, phone }),
    keepalive: true
  }).catch(() => undefined);
}

const fab: CSSProperties = {
  position: 'fixed',
  right: 'max(16px, env(safe-area-inset-right))',
  bottom: 'max(16px, env(safe-area-inset-bottom))',
  zIndex: 90,
  width: 60,
  height: 60,
  borderRadius: '50%',
  border: 0,
  background: T.accent,
  color: T.accentText,
  cursor: 'pointer',
  boxShadow: '0 12px 32px -8px rgba(0,0,0,.5)',
  display: 'grid',
  placeItems: 'center'
};

const chip: CSSProperties = {
  border: `1px solid ${T.accent}`,
  background: 'transparent',
  color: T.text,
  borderRadius: 999,
  padding: '7px 12px',
  fontSize: 13,
  lineHeight: 1.2,
  cursor: 'pointer',
  textAlign: 'left'
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [tease, setTease] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: CHAT.greeting }]);
  const [next, setNext] = useState<string[]>(CHAT.start);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(TEASED_KEY) === '1';
    } catch {}
    if (seen) return;
    const t = setTimeout(() => {
      setTease(true);
      try {
        sessionStorage.setItem(TEASED_KEY, '1');
      } catch {}
    }, 12000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing]);

  const ask = (text: string, topicId?: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    const reply = answer(CHAT, clean, topicId);
    setMsgs((m) => [...m, { from: 'me', text: clean }]);
    setNext([]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: 'bot', text: reply.text }]);
      setNext(reply.next);
    }, 600);
    forward(clean, reply.text, reply.phone);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
    setInput('');
  };

  const toggle = () => {
    setOpen((o) => !o);
    setTease(false);
  };

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label={CHAT.title}
          style={{
            position: 'fixed',
            right: 'max(16px, env(safe-area-inset-right))',
            bottom: 'calc(max(16px, env(safe-area-inset-bottom)) + 72px)',
            zIndex: 90,
            width: 'min(380px, calc(100vw - 32px))',
            height: 'min(560px, calc(100svh - 120px))',
            display: 'flex',
            flexDirection: 'column',
            background: T.bg,
            color: T.text,
            border: `1px solid ${T.line}`,
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 24px 64px -16px rgba(0,0,0,.6)',
            fontFamily: 'inherit'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: `1px solid ${T.line}`, background: T.panel }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3DBE6B', flexShrink: 0 }}></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{CHAT.title}</div>
              <div style={{ fontSize: 12, color: T.muted }}>{CHAT.subtitle}</div>
            </div>
            {CONTACTS.phoneHref && (
              <a href={CONTACTS.phoneHref} aria-label={`Позвонить ${CONTACTS.phone}`} style={{ color: T.accent, fontSize: 13, whiteSpace: 'nowrap', textDecoration: 'none' }}>
                Позвонить
              </a>
            )}
            <button type="button" onClick={toggle} aria-label="Закрыть чат" style={{ border: 0, background: 'transparent', color: T.muted, fontSize: 22, lineHeight: 1, cursor: 'pointer', padding: 4 }}>
              ×
            </button>
          </div>
          <div ref={list} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start',
                  maxWidth: '86%',
                  padding: '10px 14px',
                  borderRadius: 14,
                  fontSize: 14,
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line',
                  ...(m.from === 'me' ? { background: T.accent, color: T.accentText, borderBottomRightRadius: 4 } : { background: T.panel, borderBottomLeftRadius: 4 })
                }}
              >
                {m.text}
              </div>
            ))}
            {typing && <div style={{ alignSelf: 'flex-start', padding: '10px 14px', borderRadius: 14, background: T.panel, color: T.muted, fontSize: 14 }}>печатает…</div>}
            {next.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                {next.map((id) => {
                  const t = topicById(CHAT, id);
                  return t ? (
                    <button type="button" key={id} style={chip} onClick={() => ask(t.label, t.id)}>
                      {t.label}
                    </button>
                  ) : null;
                })}
              </div>
            )}
          </div>
          <form onSubmit={submit} style={{ display: 'flex', gap: 8, padding: 12, borderTop: `1px solid ${T.line}`, background: T.panel }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Вопрос или номер телефона"
              aria-label="Сообщение"
              maxLength={600}
              style={{ flex: 1, minWidth: 0, fontSize: 16, padding: '10px 12px', borderRadius: 10, border: `1px solid ${T.line}`, background: T.bg, color: T.text, outline: 'none' }}
            />
            <button type="submit" aria-label="Отправить" style={{ border: 0, borderRadius: 10, padding: '0 14px', background: T.accent, color: T.accentText, fontSize: 18, cursor: 'pointer' }}>
              →
            </button>
          </form>
        </div>
      )}
      {tease && !open && (
        <button
          type="button"
          onClick={toggle}
          style={{
            position: 'fixed',
            right: 'max(16px, env(safe-area-inset-right))',
            bottom: 'calc(max(16px, env(safe-area-inset-bottom)) + 72px)',
            zIndex: 90,
            maxWidth: 260,
            padding: '12px 16px',
            borderRadius: '14px 14px 4px 14px',
            border: `1px solid ${T.line}`,
            background: T.bg,
            color: T.text,
            fontSize: 14,
            textAlign: 'left',
            cursor: 'pointer',
            boxShadow: '0 16px 40px -12px rgba(0,0,0,.5)'
          }}
        >
          <b style={{ display: 'block', marginBottom: 2 }}>Чем вам помочь?</b>
          <span style={{ color: T.muted }}>Ответим на вопросы о ценах, рассрочке и доходе</span>
        </button>
      )}
      <button type="button" style={fab} onClick={toggle} aria-label={open ? 'Закрыть чат' : 'Открыть чат: чем вам помочь?'} aria-expanded={open}>
        {open ? (
          <span style={{ fontSize: 28, lineHeight: 1 }}>×</span>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
          </svg>
        )}
      </button>
    </>
  );
}
