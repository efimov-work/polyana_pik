export const INTEREST_EVENT = 'pp:interest';
export const REQUEST_ID = 'request';

export function askPrice(interest: string) {
  window.dispatchEvent(new CustomEvent<string>(INTEREST_EVENT, { detail: interest }));
  const target = document.getElementById(REQUEST_ID);
  if (!target) return;
  target.scrollIntoView({ block: 'center' });
  target.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
}
