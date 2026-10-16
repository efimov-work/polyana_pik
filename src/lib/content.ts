import { asset } from './asset';

export const CONTACTS = {
  phone: '+7 (900) 000-00-00',
  phoneHref: 'tel:+79000000000',
  max: '',
  telegram: ''
};

export const COMPLEX = {
  name: 'Поляна Пик',
  place: 'Красная Поляна, Сочи',
  street: 'ул. Защитников Кавказа, 77',
  locality: 'Красная Поляна',
  region: 'Краснодарский край',
  country: 'RU',
  developer: 'PARADE Development'
};

export const FACTS = [
  { value: '5 мин', text: 'до 4 горнолыжных курортов', accent: true },
  { value: '30 мин', text: 'от аэропорта Сочи' },
  { value: '5 га', text: 'закрытой охраняемой территории' },
  { value: 'от 43 м²', text: 'с отделкой и техникой' },
  { value: '214‑ФЗ', text: 'регистрация в Росреестре' }
];

export const REASONS = [
  { title: 'Сезон круглый год', text: 'Зимой едут кататься, летом гулять в горах и на термы. Апартамент не простаивает.' },
  { title: 'Под ключ', text: 'Ремонт, мебель и техника уже в цене. Можно заезжать или сдавать сразу.' },
  { title: 'Рассрочка 0%', text: 'Без процентов до окончания строительства. Цена фиксируется в договоре.' },
  { title: 'Рост стоимости', text: 'Пока идёт стройка, цена ниже, чем будет после сдачи дома.' }
];

export const FORMATS = [
  {
    title: 'Апартаменты',
    note: 'от 43 м²',
    text: '1, 2 или 3 спальни, кухня-гостиная и терраса на Мзымту.',
    img: asset('/assets/format-apartments.webp'),
    alt: 'Спальня в апартаментах комплекса «Поляна Пик»'
  },
  {
    title: 'Пентхаусы',
    note: 'от 72 м², сауна',
    text: 'Два уровня, высокие потолки, панорамная терраса.',
    img: asset('/assets/format-penthouse.webp'),
    alt: 'Двухуровневая гостиная пентхауса с камином'
  },
  {
    title: 'Шале',
    note: '7 шале от 176 м²',
    text: 'Отдельный дом на территории комплекса. Интерьер делается под владельца.',
    img: asset('/assets/format-chalet.webp'),
    alt: 'Вид на заснеженные вершины Красной Поляны'
  }
];

export const COMMERCE = {
  title: 'Коммерция',
  note: 'от 25 м², взнос 50%, рассрочка 18 мес',
  text: 'Гости отеля и туристы проходят мимо каждый день, в любой сезон.',
  lots: [
    { name: 'Офис / прокат', area: '25 м²' },
    { name: 'Студия красоты', area: '57,3 м²' },
    { name: 'Фитнес-клуб', area: '316 м²' },
    { name: 'Торговое помещение', area: '420 м²' }
  ]
};

export type LayoutGroup = 'one' | 'duplex' | 'other';

export const LAYOUT_FILTERS: { id: 'all' | LayoutGroup; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'one', label: '1 спальня' },
  { id: 'duplex', label: 'Двухуровневые' }
];

export const LAYOUTS: { area: string; tag: string; group: LayoutGroup; title: string; desc: string }[] = [
  { area: '45,9', tag: '1 спальня', group: 'one', title: 'Апартаменты с одной спальней', desc: 'Кухня-гостиная с выходом на террасу, вид на Мзымту и горы.' },
  { area: '52,8', tag: '1 спальня', group: 'one', title: 'Апартаменты с одной спальней', desc: 'Спальня с панорамными окнами, терраса с видом на горы.' },
  { area: '65,3', tag: 'Угловые', group: 'other', title: 'Спальня и просторная гостиная', desc: 'Терраса по периметру с видом на долину и реку.' },
  { area: '72,4', tag: '2 уровня', group: 'duplex', title: 'Пентхаус с двумя спальнями', desc: 'Высокие потолки, инфракрасная сауна, терраса на Мзымту.' },
  { area: '84,5', tag: '2 уровня', group: 'duplex', title: 'Пентхаус с двумя спальнями', desc: 'Просторная спальня с выходом на террасу, сауна.' },
  { area: '119', tag: 'Угловой', group: 'other', title: 'Три спальни, кабинет, сауна', desc: 'Кабинет с библиотекой и вид на Чёрную Пирамиду.' }
];

export const GALLERY = [
  { img: asset('/assets/gallery-1.webp'), alt: 'Гостиная с панорамным окном' },
  { img: asset('/assets/gallery-2.webp'), alt: 'Спальня с окнами в пол' },
  { img: asset('/assets/gallery-3.webp'), alt: 'Кабинет с библиотекой' },
  { img: asset('/assets/gallery-4.webp'), alt: 'Кухня-гостиная с обеденным столом' },
  { img: asset('/assets/gallery-5.webp'), alt: 'Ванная комната в светлом мраморе' },
  { img: asset('/assets/gallery-6.webp'), alt: 'Кухня-гостиная с диваном и обеденной зоной' }
];

export const SERVICES = [
  'Консьерж-сервис',
  'Медицинский консьерж',
  'Спа-комплекс',
  'Круглогодичный бассейн',
  'Ресторан',
  'Фитнес-клуб',
  'Детский центр',
  'Лыжное хранилище',
  'Бутики',
  'Конференц-зал',
  'Парк и прогулочные тропы',
  'Многоуровневый паркинг'
];

export const DISTANCES = [
  { place: 'Роза Хутор, Газпром, Красная Поляна', value: '5 мин' },
  { place: 'Аэропорт Сочи', value: '30 мин' },
  { place: 'Казино Сочи', value: '2 км' },
  { place: 'Чёрное море', value: '40 км' }
];

export const PURPOSES = ['Для себя', 'Под сдачу', 'Бизнес'] as const;
