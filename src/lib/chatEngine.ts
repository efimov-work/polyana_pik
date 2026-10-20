import { isPhone } from './contact';

export type ChatTopic = {
  id: string;
  label: string;
  keys: string[];
  answer: string;
  next?: string[];
};

export type ChatTheme = {
  accent: string;
  accentText: string;
  bg: string;
  panel: string;
  text: string;
  muted: string;
  line: string;
};

export type ChatConfig = {
  site: string;
  title: string;
  subtitle: string;
  greeting: string;
  start: string[];
  topics: ChatTopic[];
  fallback: string;
  phoneThanks: string;
  theme: ChatTheme;
};

export type Reply = { text: string; next: string[]; phone: string; topic: string };

function normalize(value: string): string {
  return value.toLowerCase().replace(/ё/g, 'е');
}

export function findPhone(value: string): string {
  const candidates = value.match(/\+?[\d\s()-]{10,20}/g) || [];
  for (const raw of candidates) {
    const v = raw.trim();
    if (isPhone(v)) return v;
  }
  return '';
}

export function topicById(config: ChatConfig, id: string): ChatTopic | undefined {
  return config.topics.find((t) => t.id === id);
}

function match(config: ChatConfig, text: string): ChatTopic | null {
  const words = normalize(text);
  let best: ChatTopic | null = null;
  let score = 0;
  for (const topic of config.topics) {
    let s = 0;
    for (const key of topic.keys) if (words.includes(normalize(key))) s += key.length;
    if (s > score) {
      best = topic;
      score = s;
    }
  }
  return best;
}

export function answer(config: ChatConfig, text: string, topicId?: string): Reply {
  const phone = findPhone(text);
  if (phone) {
    return { text: config.phoneThanks.replace('{phone}', phone), next: config.start.filter((id) => id !== 'contact'), phone, topic: 'phone' };
  }
  const topic = (topicId && topicById(config, topicId)) || match(config, text);
  if (!topic) return { text: config.fallback, next: ['contact', ...config.start.filter((id) => id !== 'contact').slice(0, 3)], phone: '', topic: '' };
  return { text: topic.answer, next: topic.next || config.start, phone: '', topic: topic.id };
}
