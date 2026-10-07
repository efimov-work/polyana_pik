'use client';

import { nextPhone } from '@/lib/contact';

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  label: string;
};

export default function PhoneInput({ value, onChange, className, placeholder = '+7 (___) ___-__-__', label }: Props) {
  return (
    <input
      className={className}
      name="phone"
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      required
      maxLength={20}
      aria-label={label}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(nextPhone(value, e.target.value))}
    />
  );
}
