import Cookies from 'js-cookie';

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = 'cookie_consent';

export const getCookieConsent = (): CookieConsent | null => {
  const consent = Cookies.get(COOKIE_CONSENT_KEY);
  return consent ? JSON.parse(consent) : null;
};

export const setCookieConsent = (consent: CookieConsent): void => {
  Cookies.set(COOKIE_CONSENT_KEY, JSON.stringify(consent), { expires: 365 });
};

export const resetCookieConsent = (): void => {
  Cookies.remove(COOKIE_CONSENT_KEY);
};