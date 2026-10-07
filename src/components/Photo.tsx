import type { CSSProperties, ReactNode } from 'react';

type Props = {
  src: string;
  alt: string;
  style?: CSSProperties;
  parallax?: number;
  clip?: number;
  children?: ReactNode;
};

export default function Photo({ src, alt, style, parallax, clip, children }: Props) {
  return (
    <div
      data-px={parallax}
      data-clip={clip}
      style={{ position: 'relative', overflow: 'hidden', background: '#1b2420', ...style }}
    >
      <img className="cover" src={src} alt={alt} loading="lazy" decoding="async" />
      {children}
    </div>
  );
}
